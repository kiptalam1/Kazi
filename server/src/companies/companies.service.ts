import { Injectable, NotFoundException } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../prisma.service.js';
import { CreateCompanyDto } from './dto/create-company.dto.js';
import { CompanyRole, Role } from '../generated/prisma/enums.js';
import { GetCompanyQueryDto } from './dto/candidate-query.dto.js';
import { Prisma } from '../generated/prisma/client.js';
import { UpdateCompanyDto } from './dto/update-company.dto.js';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  // get my company jobs;
  async getMyCompanyJobs(userId: string) {
    const company = await this.getMyCompany(userId);
    const jobs = await this.prisma.job.findMany({
      where: {
        companyId: company.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return jobs.map((job) => ({
      ...job,
      salaryMin: job.salaryMin?.toNumber() ?? null,
      salaryMax: job.salaryMax?.toNumber() ?? null,
    }));
  }

  // get employer dashboard analytics;
  async getAnalytics(userId: string) {
    const company = await this.getMyCompany(userId);

    // Get active jobs count
    const activeJobs = await this.prisma.job.count({
      where: {
        companyId: company.id,
        status: 'PUBLISHED',
      },
    });

    // Get all applications for this company
    const applications = await this.prisma.application.findMany({
      where: {
        job: {
          companyId: company.id,
        },
      },
      include: {
        candidate: {
          include: {
            user: true,
          },
        },
        job: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10, // Get last 10 applications
    });

    // Total applications count
    const totalApplications = await this.prisma.application.count({
      where: {
        job: {
          companyId: company.id,
        },
      },
    });

    // Applications from last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newApplicationsThisWeek = await this.prisma.application.count({
      where: {
        job: {
          companyId: company.id,
        },
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    // Count applications by status
    const statusCounts = {
      PENDING: 0,
      REVIEWING: 0,
      SHORTLISTED: 0,
      INTERVIEW: 0,
      OFFERED: 0,
      HIRED: 0,
      REJECTED: 0,
      WITHDRAWN: 0,
    };

    for (const app of applications) {
      if (statusCounts[app.status] !== undefined) {
        statusCounts[app.status]++;
      }
    }

    // Get total count per status
    const applicationsByStatus = await this.prisma.application.groupBy({
      by: ['status'],
      where: {
        job: {
          companyId: company.id,
        },
      },
      _count: true,
    });

    const applicationStatusMap = {
      PENDING: 0,
      REVIEWING: 0,
      SHORTLISTED: 0,
      INTERVIEW: 0,
      OFFERED: 0,
      HIRED: 0,
      REJECTED: 0,
      WITHDRAWN: 0,
    };

    for (const item of applicationsByStatus) {
      applicationStatusMap[item.status] = item._count;
    }

    // Format recent applications
    const recentApplications = applications.map((app) => ({
      id: app.id,
      candidateName: `${app.candidate.user.firstName} ${app.candidate.user.lastName}`,
      jobTitle: app.job.title,
      appliedDate: app.createdAt,
      status: app.status,
    }));

    return {
      activeJobs,
      totalApplications,
      newApplicationsThisWeek,
      applicationsByStatus: applicationStatusMap,
      recentApplications,
    };
  }

  // get my company;
  async getMyCompany(userId: string) {
    const company = await this.prisma.company.findFirst({
      where: {
        companyMembers: {
          some: {
            userId,
          },
        },
      },
      include: {
        companyMembers: {
          where: { userId },
        },
      },
    });

    if (!company) {
      throw new NotFoundException('No company found.');
    }

    return company;
  }

  // fetch one ;
  async findOne(slug: string) {
    const company = await this.getBySlug(slug);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return {
      data: company,
    };
  }

  // update company;
  async update(id: string, updateDto: UpdateCompanyDto) {
    const company = await this.getById(id);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    const updated = await this.prisma.company.update({
      where: { id: company.id },
      data: updateDto,
    });

    return {
      message: 'Fields updated successfully',
      data: updated,
    };
  }

  // get company by id;
  async getById(id: string) {
    return await this.prisma.company.findUnique({
      where: { id },
    });
  }

  // get company by slug;
  async getBySlug(slug: string) {
    return await this.prisma.company.findUnique({
      where: {
        slug,
      },
    });
  }

  // get all companies;
  async findAll(query: GetCompanyQueryDto) {
    const { page, limit, search } = query;
    const skip = (page - 1) * limit;
    const where: Prisma.CompanyWhereInput = search
      ? {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        }
      : {};
    const [data, total] = await this.prisma.$transaction([
      this.prisma.company.findMany({
        where,
        skip,
        take: limit,
      }),
      this.prisma.company.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // create a company;
  async create(userId: string, createCompanyDto: CreateCompanyDto) {
    let slug = slugify(createCompanyDto.name, {
      lower: true,
      strict: true,
      trim: true,
    });
    let counter = 2;
    while (await this.prisma.company.findUnique({ where: { slug } })) {
      slug = `${slug}-${counter++}`;
    }

    return this.prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          ...createCompanyDto,
          slug,
          companyMembers: {
            create: {
              userId,
              role: CompanyRole.COMPANY_ADMIN,
            },
          },
        },
      });
      await tx.userRole.upsert({
        where: {
          userId_role: {
            userId,
            role: Role.COMPANY_ADMIN,
          },
        },
        update: {},
        create: {
          userId,
          role: Role.COMPANY_ADMIN,
        },
      });
      return company;
    });
  }
}

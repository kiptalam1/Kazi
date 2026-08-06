import { ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto.js';
import { UpdateJobDto } from './dto/update-job.dto.js';
import { JobStatus } from '../generated/prisma/enums.js';
import { CompaniesService } from '../companies/companies.service.js';
import { PrismaService } from '../prisma.service.js';
import { GetQueryDto } from '../common/dto/query.dto.js';
import { Prisma } from '../generated/prisma/client.js';
import { CompanyMembersService } from '../company-members/company-members.service.js';

@Injectable()
export class JobsService {
  constructor(
    private prisma: PrismaService,
    private companyService: CompaniesService,
    private readonly companyMembersService: CompanyMembersService,
  ) { }

  // create a new job;
  async create(userId: string, slug: string, createJobDto: CreateJobDto) {
    const company = await this.companyService.getBySlug(slug);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    const member = await this.companyMembersService.getMember(userId, company.id);
    if (!member) {
      throw new ForbiddenException('You are not a member of this company.');
    }
    const allowed = this.companyMembersService.canManageOperations(member.role);
    if (!allowed) {
      throw new ForbiddenException('Permission denied.');
    }
    const jobCreated = await this.prisma.job.create({
      data: {
        ...createJobDto,
        companyId: company.id,
        createdById: userId,
      },
    });

    return {
      message: 'Job created successfully',
      data: jobCreated,
    };
  }

  // get all jobs;
  async findAll(queryDto: GetQueryDto) {
    const { page, experienceLevel, limit, search, order, sortBy, isRemote, companySlug } = queryDto;
    const skip = (page - 1) * limit;
    const where: Prisma.JobWhereInput = {
      status: JobStatus.PUBLISHED,
    };
    if (search) {
      where.title = {
        mode: "insensitive",
        contains: search,
      };
    }
    if (isRemote !== undefined) {
      where.isRemote = isRemote;
    }
    if (companySlug) {
      where.company = {
        slug: companySlug,
      };
    }
    if (experienceLevel) {
      where.experienceLevel = experienceLevel;
    }
    const orderBy: Prisma.JobOrderByWithRelationInput = {
      [sortBy]: order,
    };

    const [jobs, total] = await this.prisma.$transaction([
      this.prisma.job.findMany({
        where,
        take: limit,
        skip,
        orderBy,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logoUrl: true,
              slug: true,
            },
          },
        },
      }),
      this.prisma.job.count({ where })
    ]
    );
    return {
      data: jobs,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  };

  // get job by id;
  async findById(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            slug: true,
          }
        }
      }
    });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  // update job fields;
  async update(
    userId: string,
    jobId: string,
    updateJobDto: UpdateJobDto
  ) {
    const job = await this.findById(jobId);
    const member = await this.companyMembersService.getMember(userId, job.companyId);
    if (!member) {
      throw new ForbiddenException('You are not a member of this company.');
    }
    const allowed = this.companyMembersService.canManageOperations(member.role);
    if (!allowed) {
      throw new ForbiddenException('Permission denied.');
    }

    const updatedJob = await this.prisma.job.update({
      where: { id: job.id },
      data: updateJobDto,
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            slug: true,
          },
        },
      },
    });

    return {
      message: 'Job updated successfully',
      data: updatedJob,
    };
  }

  // delete job posting;
  async remove(
    userId: string,
    jobId: string,
  ) {
    const job = await this.findById(jobId);
    const member = await this.companyMembersService.getMember(userId, job.companyId);
    if (!member) {
      throw new ForbiddenException('Your are not a member of this company.');
    }
    const allowed = this.companyMembersService.canManageOperations(member.role);
    if (!allowed) {
      throw new ForbiddenException('Permission denied.');
    }
    const deletedJob = await this.prisma.job.delete({
      where: { id: jobId },
    });

    return {
      message: 'Job deleted successfully',
      data: deletedJob,
    };
  }
}

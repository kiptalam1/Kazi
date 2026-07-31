import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../prisma.service.js';
import { CreateCompanyDto } from './dto/create-company.dto.js';
import { CompanyRole, Role } from '../generated/prisma/enums.js';
import type { GetCompanyQueryDto } from './dto/candidate-query.dto.js';
import type { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class CompaniesService {
  constructor(
    private prisma: PrismaService,
  ) { }
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
    const where: Prisma.CompanyWhereInput = search ? {
      name: {
        contains: search,
        mode: "insensitive",
      },
    } : {}
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

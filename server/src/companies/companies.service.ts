import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../prisma.service.js';
import { CreateCompanyDto } from './dto/create-company.dto.js';
import { CompanyRole, Role } from '../generated/prisma/enums.js';

@Injectable()
export class CompaniesService {
  constructor(
    private prisma: PrismaService,
  ) { }
  // get company by slug;
  async getBySlug(slug: string) {
    return await this.prisma.company.findUnique({
      where: {
        slug,
      },
    });
  }

  // get all companies;
  async findAll() {
    return await this.prisma.company.findMany();
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

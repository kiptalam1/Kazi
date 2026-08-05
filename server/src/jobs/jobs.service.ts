import { ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto.js';
import { UpdateJobDto } from './dto/update-job.dto.js';
import { CompanyRole } from '../generated/prisma/enums.js';
import { CompaniesService } from '../companies/companies.service.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class JobsService {
  constructor(
    private prisma: PrismaService,
    private companyService: CompaniesService,
  ) { }
  async create(userId: string, slug: string, createJobDto: CreateJobDto) {
    const company = await this.companyService.getBySlug(slug);
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    const member = await this.prisma.companyMember.findUnique({
      where: {
        companyId_userId: {
          userId,
          companyId: company.id,
        },
      },
    });

    if (!member) {
      throw new ForbiddenException('You are not a member of this company.');
    }

    const allowedRoles: CompanyRole[] = [
      CompanyRole.COMPANY_ADMIN,
      CompanyRole.HIRING_MANAGER,
      CompanyRole.RECRUITER]

    const allowed = allowedRoles.includes(member.role);

    if (!allowed) {
      throw new ForbiddenException('Permission denied.');
    }

    return await this.prisma.job.create({
      data: {
        ...createJobDto,
        companyId: company.id,
        createdById: userId,
      }
    });
  }

  findAll() {
    return `This action returns all jobs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}

import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service.js';
import { JobsController } from './jobs.controller.js';
import { CompaniesService } from '../companies/companies.service.js';
import { PrismaService } from '../prisma.service.js';
import { CompanyMembersService } from '../company-members/company-members.service.js';

@Module({
  controllers: [JobsController],
  providers: [
    JobsService,
    CompaniesService,
    PrismaService,
    CompanyMembersService,
  ],
})
export class JobsModule {}

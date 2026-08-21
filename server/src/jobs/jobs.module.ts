import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service.js';
import { JobsController } from './jobs.controller.js';
import { PrismaService } from '../prisma.service.js';
import { CompaniesModule } from '../companies/companies.module.js';
import { CompanyMembersModule } from '../company-members/company-members.module.js';

@Module({
  imports: [CompaniesModule, CompanyMembersModule],
  controllers: [JobsController],
  providers: [JobsService, PrismaService],
  exports: [JobsService],
})
export class JobsModule {}

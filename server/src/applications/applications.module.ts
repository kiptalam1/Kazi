import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service.js';
import { ApplicationsController } from './applications.controller.js';
import { PrismaService } from '../prisma.service.js';
import { UsersModule } from '../users/users.module.js';
import { JobsModule } from '../jobs/jobs.module.js';
import { CompaniesModule } from '../companies/companies.module.js';
import { CompanyMembersModule } from '../company-members/company-members.module.js';
import { CandidatesModule } from '../candidates/candidates.module.js';

@Module({
  imports: [
    UsersModule,
    JobsModule,
    CompaniesModule,
    CompanyMembersModule,
    CandidatesModule,
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, PrismaService],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}

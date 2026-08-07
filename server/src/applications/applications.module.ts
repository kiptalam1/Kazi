import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service.js';
import { ApplicationsController } from './applications.controller.js';
import { PrismaService } from '../prisma.service.js';
import { UsersService } from '../users/users.service.js';
import { JobsService } from '../jobs/jobs.service.js';
import { CompaniesService } from '../companies/companies.service.js';
import { CompanyMembersService } from '../company-members/company-members.service.js';
import { CandidatesService } from '../candidates/candidates.service.js';

@Module({
  controllers: [ApplicationsController],
  providers: [
    ApplicationsService,
    PrismaService,
    UsersService,
    JobsService,
    CompaniesService,
    CompanyMembersService,
    CandidatesService,
  ],
})
export class ApplicationsModule {}

import { Module } from '@nestjs/common';
import { CompanyMembersService } from './company-members.service.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  providers: [CompanyMembersService, PrismaService],
  exports: [CompanyMembersService],
})
export class CompanyMembersModule {}

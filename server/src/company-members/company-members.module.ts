import { Module } from '@nestjs/common';
import { CompanyMembersService } from './company-members.service.js';

@Module({
  providers: [CompanyMembersService],
  exports: [CompanyMembersService],
})
export class CompanyMembersModule {}

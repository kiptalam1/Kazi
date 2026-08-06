import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CompanyRole } from '../generated/prisma/enums.js';

@Injectable()
export class CompanyMembersService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }
  async getMember(
    userId: string,
    companyId: string
  ) {
    return await this.prisma.companyMember
      .findUnique({
        where: {
          companyId_userId: {
            companyId,
            userId,
          },
        },
      });
  }

  canManageOperations(role: CompanyRole) {
    const allowedRoles: CompanyRole[] = [
      CompanyRole.RECRUITER,
      CompanyRole.COMPANY_ADMIN,
      CompanyRole.HIRING_MANAGER,
    ];
    return allowedRoles.includes(role);
  }

}

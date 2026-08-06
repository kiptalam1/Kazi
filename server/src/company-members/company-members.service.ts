import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';

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
}

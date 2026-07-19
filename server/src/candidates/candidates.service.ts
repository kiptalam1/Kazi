import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import type { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class CandidatesService {
  constructor(
    // private usersService: UsersService,
    private prisma: PrismaService,
  ) { }

  async candidate(
    candidateWhereUniqueInput: Prisma.CandidateWhereUniqueInput
  ) {
    const candidate = await this.prisma.candidate.findUnique({
      where: candidateWhereUniqueInput,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatar: true,
            roles: {
              select: { role: true, },
            },
          },
        },
      },
    });

    if (!candidate) {
      throw new NotFoundException('User not found');
    }

    return {
      data: candidate,
    };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import { GetCandidateQueryDto } from './dto/query.dto.js';

@Injectable()
export class CandidatesService {
  constructor(
    private prisma: PrismaService,
  ) { }

  // get all candidates 
  async candidates(query: GetCandidateQueryDto) {
    const { page, limit, search } = query;
    const skip = (page - 1) * limit;
    const where: Prisma.CandidateWhereInput = search ? {
      user: {
        OR: [{
          firstName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        ],
      },
    }
      : {}
    const [data, total] = await this.prisma.$transaction([
      this.prisma.candidate.findMany({
        where,
        skip: skip,
        take: limit,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              avatar: true,
              roles: {
                select: {
                  role: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.candidate.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // update candidate .
  async updateByUserId(
    userId: string,
    dto: Prisma.CandidateUpdateInput,
  ) {
    return await this.prisma.candidate.update({
      where: { userId },
      data: dto,
    });
  }

  // get one candidate;
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
            // email: true,
            // phone: true,
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

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import type { Prisma, User } from '../generated/prisma/client.js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  // my profile
  async me(id: string) {
    const user = await this.findById(id);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    const roles = user.roles.map((r) => r.role);
    return {
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles,
        avatar: user.avatar,
        phone: user.phone,
        isActive: user.isActive,
        candidate: user.candidates,
        lastLoginAt: user.lastLoginAt,
      },
    };
  }

  // find user with email
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        roles: true,
        candidates: true,
      },
    });
  }

  // find user with id
  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: true,
        candidates: true,
      },
    });
  }

  // update user
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }
}

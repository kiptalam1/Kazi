import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import type { Prisma, User } from '../generated/prisma/client.js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  // find user with email
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        roles: true,
      },
    });
  }

  // find user with id
  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { passwordHash: _passwordHash, ...result } = user;
    return result;
  }

  // update user
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data, where,
    });
  }
}

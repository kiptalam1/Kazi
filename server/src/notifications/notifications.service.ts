import { Injectable } from '@nestjs/common';
import { type CreateNotificationInput } from './dto/create-notification.dto.js';
import type { PrismaService } from '../prisma.service.js';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateNotificationInput) {
    return await this.prisma.notification.create({
      data: input,
    });
  }

  findAll() {
    return `This action returns all notifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}

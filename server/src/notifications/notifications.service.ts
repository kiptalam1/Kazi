import { Injectable, NotFoundException } from '@nestjs/common';
import { type CreateNotificationInput } from './dto/create-notification.dto.js';
import { PrismaService } from '../prisma.service.js';
import type { NotificationEntity } from './entities/notification.entity.js';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateNotificationInput) {
    return await this.prisma.notification.create({
      data: input,
    });
  }

  async findAll(userId: string): Promise<NotificationEntity[]> {
    return await this.prisma.notification.findMany({
      where: { userId },
      select: {
        id: true,
        userId: true,
        title: true,
        message: true,
        type: true,
        isRead: true,
        resourceId: true,
        resourceType: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: string, userId: string): Promise<NotificationEntity> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id,
        userId,
      },
    });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return notification;
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    await this.prisma.notification.delete({
      where: {
        id,
        userId,
      },
    });
    return {
      message: 'Notification deleted successfully.',
    };
  }

  async markRead(id: string, userId: string) {
    const notification = await this.findOne(id, userId);
    if (notification.isRead) return;

    await this.prisma.notification.update({
      where: {
        id: notification.id,
        userId: notification.userId,
      },
      data: {
        isRead: true,
      },
    });
  }
}

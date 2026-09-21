import type { NotificationType } from '../../generated/prisma/enums.js';

export class NotificationEntity {
  id!: string;
  type!: NotificationType;
  userId!: string;
  title!: string;
  message!: string;
  isRead!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

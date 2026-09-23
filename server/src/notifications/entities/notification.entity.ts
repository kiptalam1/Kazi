import type {
  NotificationType,
  ResourceType,
} from '../../generated/prisma/enums.js';

export class NotificationEntity {
  id!: string;
  type!: NotificationType;
  userId!: string;
  title!: string;
  message!: string;
  isRead!: boolean;
  resourceType!: ResourceType | null;
  resourceId!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}

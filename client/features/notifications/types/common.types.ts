type NotificationType =
  | 'APPLICATION_SUBMITTED'
  | 'NEW_MESSAGE'
  | 'APPLICATION_STATUS_CHANGED'
  | 'JOB_STATUS_CHANGED'
  | 'NEW_APPLICATION'
  | 'INTERVIEW_SCHEDULED'
  | 'JOB_CREATED';

type ResourceType =
  | 'JOB'
  | 'PROFILE'
  | 'APPLICATION';

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  resourceType: ResourceType;
  resourceId: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

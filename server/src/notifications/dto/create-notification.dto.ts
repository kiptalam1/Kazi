import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { NotificationType } from '../../generated/prisma/enums.js';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;

  @IsUUID()
  userId!: string;

  @ApiProperty({ type: () => NotificationType })
  @IsEnum(NotificationType)
  type!: NotificationType;
}

export interface CreateNotificationInput {
  type: NotificationType;
  userId: string;
  title: string;
  message: string;
}

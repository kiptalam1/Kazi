import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service.js';
import { CreateNotificationDto } from './dto/create-notification.dto.js';
import { ApiOkResponse, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { NotificationEntity } from './entities/notification.entity.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';

@Controller('api/v1/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  // fetch all user notifications
  @Get()
  @ApiOperation({
    summary: 'User fetch all his notifications.',
  })
  @ApiProperty({
    type: NotificationEntity,
    isArray: true,
  })
  @ApiOkResponse({
    type: NotificationEntity,
    isArray: true,
  })
  async findAll(
    @CurrentUser('id') userId: string,
  ): Promise<NotificationEntity[]> {
    return this.notificationsService.findAll(userId);
  }

  @ApiOperation({
    summary: 'User fetch one notification.',
  })
  @ApiProperty({
    type: NotificationEntity,
  })
  @ApiOkResponse({
    type: NotificationEntity,
  })
  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('id') userId: string,
  ): Promise<NotificationEntity> {
    return this.notificationsService.findOne(id, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return await this.notificationsService.remove(id, userId);
  }
}

import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}

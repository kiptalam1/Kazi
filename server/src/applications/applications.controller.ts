import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApplicationsService } from './applications.service.js';
import { CreateApplicationDto } from './dto/create-application.dto.js';
import { UpdateApplicationStatusDto } from './dto/update-application.dto.js';
import { ApiOkResponse } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { ApplicationCreatedResponse, ApplicationStatusUpdatedResponse } from './dto/application-response.dto.js';

@Controller('api/v1/applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) { }

  @Post('jobs/:jobId')
  @ApiOkResponse({ type: ApplicationCreatedResponse })
  async create(
    @CurrentUser('id') userId: string,
    @Param('jobId', ParseUUIDPipe) jobId: string,
    @Body() createApplicationDto: CreateApplicationDto): Promise<ApplicationCreatedResponse> {
    return await this.applicationsService.create(userId, jobId, createApplicationDto);
  }

  @Get()
  findAll() {
    return this.applicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(+id);
  }

  // update candidate's application status;
  @ApiOkResponse({
    type: ApplicationStatusUpdatedResponse,
  })
  @Patch(':applicationId/status')
  update(
    @CurrentUser('id') userId: string,
    @Param('applicationId') applicationId: string,
    @Body() updateApplicationStatusDto: UpdateApplicationStatusDto
  ): Promise<ApplicationStatusUpdatedResponse> {
    return this.applicationsService.updateStatus(userId, applicationId, updateApplicationStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(+id);
  }
}

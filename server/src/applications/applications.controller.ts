import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service.js';
import { CreateApplicationDto } from './dto/create-application.dto.js';
import { UpdateApplicationStatusDto } from './dto/update-application.dto.js';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import {
  ApplicationCreatedResponse,
  ApplicationStatusUpdatedResponse,
  ApplicationWithdrawnResponse,
} from './dto/application-response.dto.js';

@Controller('api/v1/applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @ApiOperation({
    summary: 'candidate make a job application',
  })
  @Post('jobs/:jobId')
  @ApiOkResponse({ type: ApplicationCreatedResponse })
  async create(
    @CurrentUser('id') userId: string,
    @Param('jobId', ParseUUIDPipe) jobId: string,
    @Body() createApplicationDto: CreateApplicationDto,
  ): Promise<ApplicationCreatedResponse> {
    return await this.applicationsService.create(
      userId,
      jobId,
      createApplicationDto,
    );
  }

  // fetch all applications;
  @Get()
  findAll() {
    return this.applicationsService.findAll();
  }

  // fetch single application
  @ApiOperation({
    summary: 'Fetch single application',
  })
  @Get(':applicationId')
  async findOneById(@Param('applicationId') applicationId: string) {
    return await this.applicationsService.findById(applicationId);
  }

  // update candidate's application status;
  @ApiOperation({
    summary: 'Employer update candidate`s application status',
  })
  @ApiOkResponse({
    type: ApplicationStatusUpdatedResponse,
  })
  @Patch(':applicationId/status')
  update(
    @CurrentUser('id') userId: string,
    @Param('applicationId') applicationId: string,
    @Body() updateApplicationStatusDto: UpdateApplicationStatusDto,
  ): Promise<ApplicationStatusUpdatedResponse> {
    return this.applicationsService.updateStatus(
      userId,
      applicationId,
      updateApplicationStatusDto,
    );
  }

  // withdraw application;
  @ApiOperation({
    summary: 'candidate withdraw application',
  })
  @ApiOkResponse({
    type: ApplicationWithdrawnResponse,
  })
  @Patch(':applicationId/withdraw')
  withdrawApplication(
    @CurrentUser('id') userId: string,
    @Param('applicationId') applicationId: string,
  ): Promise<ApplicationWithdrawnResponse> {
    return this.applicationsService.withdraw(userId, applicationId);
  }

  // delete;
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(+id);
  }
}

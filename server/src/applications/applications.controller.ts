import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service.js';
import { CreateApplicationDto } from './dto/create-application.dto.js';
import { UpdateApplicationStatusDto } from './dto/update-application.dto.js';
import { ApiOkResponse, ApiOperation, } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import {
  ApplicationCreatedResponse,
  ApplicationStatusUpdatedResponse,
  ApplicationWithdrawnResponse,
  CandidateApplicationApiResponse,
  EmployerApplicationsResponseDto,
  QueryDto,
  SingleCandidateApplicationResponseDto,
} from './dto/application-response.dto.js';
import { GetQueryDto } from '../common/dto/query.dto.js';

@Controller('api/v1/applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) { }

  // candidate fetch their single application;
  @ApiOperation({
    summary: "candidate fetch their single application"
  })
  @ApiOkResponse({
    type: SingleCandidateApplicationResponseDto
  })
  @Get(':applicationId')
  async findSingleCandidateApplication(
    @CurrentUser('id') userId: string,
    @Param('applicationId', ParseUUIDPipe) applicationId: string,
  ): Promise<SingleCandidateApplicationResponseDto> {
    return await this.applicationsService.findSingleCandidateApplication(userId, applicationId);
  }

  // apply for a job
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

  // fetch all the candidate's own applications;
  @ApiOperation({
    summary: "Fetch candidate's own applications",
  })
  @ApiOkResponse({
    type: CandidateApplicationApiResponse,
    isArray: true,
  })
  @Get('me')
  async findCandidateApplications(
    @CurrentUser('id') userId: string,
    @Query() query: QueryDto,
  ): Promise<CandidateApplicationApiResponse> {
    return this.applicationsService.findCandidateApplications(userId, query);
  }

  // Employer fetch all job applications per job;
  @ApiOperation({
    summary: 'Employer fetch all candidates applications per job',
  })
  @ApiOkResponse({
    type: EmployerApplicationsResponseDto
  })
  @Get('jobs/:jobId/applications')
  async getAllApplicationsByJob(
    @CurrentUser('id') userId: string,
    @Param('jobId') jobId: string,
    @Query() query: GetQueryDto,
  ): Promise<EmployerApplicationsResponseDto> {
    return await this.applicationsService.getAllApplicationsByJob(
      userId,
      jobId,
      query,
    );
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

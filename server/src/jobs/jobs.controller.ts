import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { JobsService } from './jobs.service.js';
import { CreateJobDto } from './dto/create-job.dto.js';
import { UpdateJobDto } from './dto/update-job.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { GetQueryDto } from '../common/dto/query.dto.js';
import { ApiOkResponse } from '@nestjs/swagger';
import { JobResponseDto } from './dto/job-response.dto.js';


@Controller('api/v1')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  // create company;
  @Post('companies/:slug/jobs')
  async create(
    @CurrentUser('id') userId: string,
    @Param('slug') slug: string,
    @Body() createJobDto: CreateJobDto
  ) {
    return await this.jobsService.create(userId, slug, createJobDto);
  }

  // fetch all jobs;
  @Get('jobs')
  @ApiOkResponse({
    type: JobResponseDto,
    isArray: true,
  })
  async findAll(
    @Query() queryDto: GetQueryDto) {
    return await this.jobsService.findAll(queryDto);
  }

  // fetch one job by id;
  @Get('jobs/:id')
  @ApiOkResponse({ type: JobResponseDto })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.jobsService.findById(id);
  }

  // update job fields;
  @Patch('jobs/:jobId')
  update(
    @CurrentUser('id') userId: string,
    @Param('jobId', ParseUUIDPipe) jobId: string,
    @Body() updateJobDto: UpdateJobDto
  ) {
    return this.jobsService.update(userId, jobId, updateJobDto);
  }

  // delete job;
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobsService } from './jobs.service.js';
import { CreateJobDto } from './dto/create-job.dto.js';
import { UpdateJobDto } from './dto/update-job.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { GetQueryDto } from '../common/dto/query.dto.js';


@Controller('api/v1')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post('companies/:slug/jobs')
  async create(
    @CurrentUser('id') userId: string,
    @Param('slug') slug: string,
    @Body() createJobDto: CreateJobDto
  ) {
    return await this.jobsService.create(userId, slug, createJobDto);
  }

  @Get('jobs')
  async findAll(
    @Query() queryDto: GetQueryDto) {
    return await this.jobsService.findAll(queryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}

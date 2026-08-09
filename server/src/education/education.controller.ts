import { Body, Controller, Post } from '@nestjs/common';
import { EducationService } from './education.service.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateEducationDto } from './dto/create-education.dto.js';
import { EducationCreatedApiResponse } from './dto/education-response.dto.js';

@Controller('api/v1/candidates/me/education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  // add education
  @ApiCreatedResponse({
    summary: 'Education added successfully',
    type: EducationCreatedApiResponse,
  })
  @ApiOperation({
    summary: 'candidate add past education',
  })
  @Post()
  async addEducation(
    @CurrentUser('id') userId: string,
    @Body() data: CreateEducationDto,
  ): Promise<EducationCreatedApiResponse> {
    return await this.educationService.addEducation(userId, data);
  }
}

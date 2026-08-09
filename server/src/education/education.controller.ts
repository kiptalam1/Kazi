import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { EducationService } from './education.service.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateEducationDto } from './dto/create-education.dto.js';
import { EducationApiResponse } from './dto/education-response.dto.js';
import { UpdateEducationDto } from './dto/update-education.dto.js';

@Controller('api/v1/candidates/me/education')
export class EducationController {
  constructor(private readonly educationService: EducationService) { }

  // add education
  @ApiCreatedResponse({
    summary: 'Education added successfully',
    type: EducationApiResponse,
  })
  @ApiOperation({
    summary: 'candidate add past education',
  })
  @Post()
  async addEducation(
    @CurrentUser('id') userId: string,
    @Body() data: CreateEducationDto,
  ): Promise<EducationApiResponse> {
    return await this.educationService.addEducation(userId, data);
  }

  // update education
  @ApiOkResponse({
    summary: 'Education updated successfully',
    type: EducationApiResponse,
  })
  @ApiOperation({
    summary: 'candidate update existing education',
  })
  @Patch(':educationId')
  async updateEducation(
    @CurrentUser('id') userId: string,
    @Param('educationId') educationId: string,
    @Body() data: UpdateEducationDto,
  ): Promise<EducationApiResponse> {
    return await this.educationService.updateEducation(
      userId,
      educationId,
      data,
    );
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EducationService } from './education.service.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateEducationDto } from './dto/create-education.dto.js';
import {
  CreatedEducationDto,
  EducationApiResponse,
} from './dto/education-response.dto.js';
import { UpdateEducationDto } from './dto/update-education.dto.js';

@Controller('api/v1/candidates/me/education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  // get my education;
  @Get()
  @ApiOperation({
    summary: 'candidate fetch education',
  })
  @ApiOkResponse({
    type: CreatedEducationDto,
    isArray: true,
  })
  async getMyEducation(
    @CurrentUser('id') userId: string,
  ): Promise<CreatedEducationDto[]> {
    return await this.educationService.getMyEducation(userId);
  }

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

  // remove education;
  @ApiOperation({
    summary: 'Candidate remove education',
  })
  @ApiNoContentResponse({
    summary: 'Education removed successfully',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':educaionId')
  async deleteEducation(
    @CurrentUser('id') userId: string,
    @Param('educationId') educationId: string,
  ) {
    return await this.educationService.removeEducation(userId, educationId);
  }
}

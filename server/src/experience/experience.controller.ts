import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ExperienceService } from './experience.service.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { CreateExperienceDto } from './dto/create-experience.dto.js';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UpdateExperienceDto } from './dto/update-experience.dto.js';
import { ExperienceApiResponse } from './dto/responses/experience-response.dto.js';

@Controller('api/v1/candidates/me/experiences')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  // add Experience
  @ApiOperation({
    summary: 'candidate add previous/current experiences',
  })
  @ApiCreatedResponse({
    type: ExperienceApiResponse,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addExperience(
    @CurrentUser('id') userId: string,
    @Body() data: CreateExperienceDto,
  ): Promise<ExperienceApiResponse> {
    return await this.experienceService.addExperience(userId, data);
  }

  // update experience
  @ApiOperation({
    summary: 'candidate update experience',
  })
  @ApiOkResponse({
    type: ExperienceApiResponse,
  })
  @Patch(':experienceId')
  async updateExperience(
    @CurrentUser('id') userId: string,
    @Param('experienceId', ParseUUIDPipe) experienceId: string,
    @Body() data: UpdateExperienceDto,
  ): Promise<ExperienceApiResponse> {
    return await this.experienceService.updateExperience(
      userId,
      experienceId,
      data,
    );
  }
}

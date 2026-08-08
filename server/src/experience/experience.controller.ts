import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ExperienceService } from './experience.service.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { CreateExperienceDto } from './dto/create-experience.dto.js';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreatedExperienceApiResponse } from './dto/responses/created-experience-response.dto.js';

@Controller('api/v1/candidates/me/experiences')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) { }

  // add Experience
  @ApiOperation({
    summary: 'candidate add previous/current experiences',
  })
  @ApiCreatedResponse({
    type: CreatedExperienceApiResponse,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addExperience(
    @CurrentUser('id') userId: string,
    @Body() data: CreateExperienceDto,
  ): Promise<CreatedExperienceApiResponse> {
    return await this.experienceService.addExperience(userId, data);
  }
}

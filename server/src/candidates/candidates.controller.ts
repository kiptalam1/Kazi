import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service.js';
import { CandidateUpdateDto } from './dto/update-candidate.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import type { CurrentUserInterface } from '../common/interface/current-user.interface.js';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CandidateProfile, GetAllCandidatesResponseDto } from './dto/candidate-response.dto.js';
import { GetCandidateQueryDto } from './dto/query.dto.js';

@Controller('api/v1/candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) { }

  // get me;
  @Get('me')
  @ApiOperation({
    summary: 'Fetch my candidate profile',
  })
  @ApiOkResponse({
    type: CandidateProfile,
  })
  async findOne(
    @CurrentUser('id') userId: string,
  ) {
    return this.candidatesService.myCandidateProfile(userId);
  }



  //get all candidates
  @Get()
  @ApiOkResponse({
    type: GetAllCandidatesResponseDto,
  })
  async findAll(
    @Query()
    query: GetCandidateQueryDto,
  ) {
    return this.candidatesService.candidates(query);
  }

  // update candidate fields;
  @Patch('me')
  async updateMe(
    @CurrentUser() user: CurrentUserInterface,
    @Body() dto: CandidateUpdateDto,
  ) {
    return await this.candidatesService.updateByUserId(user.id, dto);
  }

  // fetch a candidate by candidate-id
  @Get(':id')
  async findOneCandidate(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return await this.candidatesService.candidate({ id });
  }
}

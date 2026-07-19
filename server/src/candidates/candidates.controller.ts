import { Body, Controller, Get, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { CandidatesService } from './candidates.service.js';
import { CandidateUpdateDto } from './dto/update-candidate.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import type { CurrentUserInterface } from '../common/interface/current-user.interface.js';

@Controller('api/v1/candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) { }


  // update candidate fields;
  @Patch('me')
  async updateMe(
    @CurrentUser() user: CurrentUserInterface,
    @Body() dto: CandidateUpdateDto,
  ) {
    return await this.candidatesService.updateByUserId(user.id, dto)
  }

  // fetch a candidate by candidate-id
  @Get(':id')
  async findOneCandidate(
    @Param('id', ParseUUIDPipe)
    id: string) {
    return await this.candidatesService.candidate({ id });
  }
}

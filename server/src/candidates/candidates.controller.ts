import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { CandidatesService } from './candidates.service.js';

@Controller('api/v1/candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) { }

  @Get(':id')
  async findOneCandidate(
    @Param('id', ParseUUIDPipe)
    id: string) {
    return await this.candidatesService.candidate({ id });
  }
}

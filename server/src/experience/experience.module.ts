import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service.js';
import { ExperienceController } from './experience.controller.js';
import { CandidatesService } from '../candidates/candidates.service.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  controllers: [ExperienceController],
  providers: [ExperienceService, CandidatesService, PrismaService],
})
export class ExperienceModule {}

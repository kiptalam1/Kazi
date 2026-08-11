import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service.js';
import { ExperienceController } from './experience.controller.js';
import { PrismaService } from '../prisma.service.js';
import { CandidatesModule } from '../candidates/candidates.module.js';

@Module({
  imports: [CandidatesModule],
  controllers: [ExperienceController],
  providers: [
    ExperienceService,
    PrismaService],
  exports: [ExperienceService],
})
export class ExperienceModule { }

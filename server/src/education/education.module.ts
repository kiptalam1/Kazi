import { Module } from '@nestjs/common';
import { EducationService } from './education.service.js';
import { EducationController } from './education.controller.js';
import { PrismaService } from '../prisma.service.js';
import { CandidatesModule } from '../candidates/candidates.module.js';

@Module({
  imports: [CandidatesModule],
  controllers: [EducationController],
  providers: [EducationService, PrismaService,],
  exports: [EducationService],
})
export class EducationModule { }

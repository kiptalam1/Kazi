import { Module } from '@nestjs/common';
import { EducationService } from './education.service.js';
import { EducationController } from './education.controller.js';
import { PrismaService } from '../prisma.service.js';
import { CandidatesService } from '../candidates/candidates.service.js';

@Module({
  controllers: [EducationController],
  providers: [EducationService, PrismaService, CandidatesService],
})
export class EducationModule { }

import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service.js';
import { CandidatesController } from './candidates.controller.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  controllers: [CandidatesController],
  providers: [CandidatesService, PrismaService],
  // exports: [PrismaService, CandidatesService],
})
export class CandidatesModule { }

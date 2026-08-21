import { Module } from '@nestjs/common';
import { ResumesService } from './resumes.service.js';
import { ResumesController } from './resumes.controller.js';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { PrismaService } from '../prisma.service.js';
import { CloudinaryModule } from '../infrastructure/storage/cloudinary/cloudinary.module.js';
import { CandidatesModule } from '../candidates/candidates.module.js';

@Module({
  imports: [
    CloudinaryModule,
    CandidatesModule,
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [ResumesController],
  providers: [ResumesService, PrismaService],
  exports: [ResumesService],
})
export class ResumesModule {}

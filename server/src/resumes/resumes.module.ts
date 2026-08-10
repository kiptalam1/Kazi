import { Module } from '@nestjs/common';
import { ResumesService } from './resumes.service.js';
import { ResumesController } from './resumes.controller.js';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { PrismaService } from '../prisma.service.js';
import { CloudinaryService } from '../infrastructure/storage/cloudinary/cloudinary.service.js';
import { CandidatesService } from '../candidates/candidates.service.js';
import { CloudinaryProvider } from '../infrastructure/storage/cloudinary/cloudinary.provider.js';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [ResumesController],
  providers: [
    ResumesService,
    PrismaService,
    CloudinaryService,
    CandidatesService,
    CloudinaryProvider,
  ],
})
export class ResumesModule { }

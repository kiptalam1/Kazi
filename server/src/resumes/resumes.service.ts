import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CandidatesService } from '../candidates/candidates.service.js';
import { PrismaService } from '../prisma.service.js';
import { CloudinaryService } from '../infrastructure/storage/cloudinary/cloudinary.service.js';
import { FileType } from '../generated/prisma/enums.js';
import { UploadResumeDto } from './dto/upload-resume.dto.js';
import {
  ResumeUploaded,
  UploadResumeApiResponse,
} from './dto/resume-response.js';

@Injectable()
export class ResumesService {
  constructor(
    private readonly candidatesService: CandidatesService,
    private readonly prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) { }

  // fetch candidate resumes;
  async getMyResumes(userId: string): Promise<ResumeUploaded[]> {
    const candidate = await this.candidatesService.findByUserId(userId);
    const resumes = await this.prisma.file.findMany({
      where: {
        candidateId: candidate.id,
        type: FileType.RESUME,
      },

    });
    return resumes;
  }

  // candidate upload resume
  async uploadResume(
    userId: string,
    file: Express.Multer.File,
    dto: UploadResumeDto,
  ): Promise<UploadResumeApiResponse> {
    const candidate = await this.candidatesService.findByUserId(userId);

    const resumeCount = await this.prisma.file.count({
      where: {
        candidateId: candidate.id,
        type: FileType.RESUME,
      },
    });

    if (resumeCount >= 5) {
      throw new BadRequestException('You can have a maximum of 5 resumes.');
    }

    const cloudinaryResponse = await this.cloudinary.uploadFile(
      file,
      'kazi/resumes',
      'raw',
    );

    try {
      const resume = await this.prisma.file.create({
        data: {
          fileName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          publicId: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
          type: FileType.RESUME,
          displayName: dto.displayName,
          candidateId: candidate.id,
        },
      });
      return {
        message: 'Resume uploaded successfully',
        data: {
          id: resume.id,
          fileName: resume.fileName,
          displayName: resume.displayName,
          size: resume.size,
          mimeType: resume.mimeType,
          url: resume.url,
          type: resume.type,
        },
      };
    } catch (error) {
      console.error(error);
      await this.cloudinary.deleteFile(cloudinaryResponse.public_id);
      throw new InternalServerErrorException('Failed to save resume.');
    }
  }

  async deleteResume(userId: string, resumeId: string) {
    const candidate = await this.candidatesService.findByUserId(userId);
    const resume = await this.prisma.file.findFirst({
      where: {
        id: resumeId,
        candidateId: candidate.id,
        type: FileType.RESUME,
      },
    });

    if (!resume) {
      throw new NotFoundException('Resume not found.');
    }

    try {
      await this.cloudinary.deleteFile(resume.publicId);
      await this.prisma.file.delete({
        where: {
          id: resume.id,
        },
      });

      return {
        message: 'Resume deleted successfully',
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to delete resume.');
    }
  }
}

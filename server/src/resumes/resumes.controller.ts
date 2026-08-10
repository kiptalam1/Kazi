import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ResumesService } from './resumes.service.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadResumeDto } from './dto/upload-resume.dto.js';
import { UploadResumeApiResponse } from './dto/resume-response.js';

const allowedResumeTypes =
  /^(application\/pdf|application\/msword|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/;

@Controller('api/v1/candidates/me/resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('resume'))
  async uploadResume(
    @CurrentUser('id') userId: string,
    @UploadedFile(new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 5 * 1024 * 1024,
          errorMessage: 'File is larger than 5MB',
        }),
        new FileTypeValidator({
          fileType: allowedResumeTypes,
          errorMessage: 'Only PDF/DOC/DOCX file expected',
        }),
      ],
    })) file: Express.Multer.File,
    @Body() dto: UploadResumeDto,
  ): Promise<UploadResumeApiResponse> {
    console.log('api/v1/candidates/me/resumes/upload has been reached');
    return await this.resumesService.uploadResume(
      userId,
      file,
      dto,
    );
  }
}

import { Body, Controller, Delete, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ResumesService } from './resumes.service.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadResumeDto } from './dto/upload-resume.dto.js';
import { UploadResumeApiResponse } from './dto/resume-response.js';
import { ApiOkResponse, ApiOperation, } from '@nestjs/swagger';

const allowedResumeTypes =
  /^(application\/pdf|application\/msword|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/;

@Controller('api/v1/candidates/me/resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) { }

  // upload candidate's resume;
  @ApiOkResponse({
    summary: 'Resume uploaded successfully',
    type: UploadResumeApiResponse,
  })
  @ApiOperation({
    summary: "Upload candidate resume",
  })
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

  // delete candidate's resume;
  @ApiOkResponse({
    summary: 'Resume deleted successfully',
  })
  @ApiOperation({
    summary: "Delete candidate resume",
  })
  @Delete(':resumeId/delete')
  async deleteResume(
    @CurrentUser('id') userId: string,
    @Param('resumeId', ParseUUIDPipe) resumeId: string,
  ) {
    return await this.resumesService.deleteResume(
      userId,
      resumeId,
    );
  }
}

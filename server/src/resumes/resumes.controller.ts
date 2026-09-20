import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ResumesService } from './resumes.service.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadResumeDto } from './dto/upload-resume.dto.js';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UploadAvatarApiResponse } from '../users/dto/avatar-response.dto.js';
import { ResumeUploaded } from './dto/resume-response.js';

const allowedResumeTypes =
  /^(application\/pdf|application\/msword|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/;

@Controller('api/v1/candidates/me/resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  // fetch my resumes;
  @ApiOkResponse({
    type: ResumeUploaded,
    isArray: true,
  })
  @ApiOperation({
    summary: 'candidate fetch his resumes',
  })
  @Get()
  async getMyResumes(
    @CurrentUser('id') userId: string,
  ): Promise<ResumeUploaded[]> {
    return await this.resumesService.getMyResumes(userId);
  }

  // upload candidate's resume;
  @ApiOkResponse({
    summary: 'Resume uploaded successfully',
    type: UploadAvatarApiResponse,
  })
  @ApiOperation({
    summary: 'Upload candidate resume',
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('resume'))
  async uploadResume(
    @CurrentUser('id') userId: string,
    @UploadedFile(
      new ParseFilePipe({
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
      }),
    )
    file: Express.Multer.File,
    @Body() dto: UploadResumeDto,
  ): Promise<UploadAvatarApiResponse> {
    return await this.resumesService.uploadResume(userId, file, dto);
  }

  // delete candidate's resume;
  @ApiOkResponse({
    summary: 'Resume deleted successfully',
  })
  @ApiOperation({
    summary: 'Delete candidate resume',
  })
  @Delete(':resumeId/delete')
  async deleteResume(
    @CurrentUser('id') userId: string,
    @Param('resumeId', ParseUUIDPipe) resumeId: string,
  ) {
    return await this.resumesService.deleteResume(userId, resumeId);
  }
}

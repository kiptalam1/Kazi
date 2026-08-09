import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateEducationDto } from './dto/create-education.dto.js';
import { CandidatesService } from '../candidates/candidates.service.js';
import { EducationCreatedApiResponse } from './dto/education-response.dto.js';

@Injectable()
export class EducationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly candidatesService: CandidatesService,
  ) { }

  // add education
  async addEducation(
    userId: string,
    data: CreateEducationDto,
  ): Promise<EducationCreatedApiResponse> {
    const candidate = await this.candidatesService.findByUserId(userId);

    const education = await this.prisma.education.create({
      data: {
        candidateId: candidate.id,
        schoolName: data.schoolName,
        fieldOfStudy: data.fieldOfStudy,
        qualification: data.qualification,
        startDate: data.startDate,
        endDate: data.endDate,
      },
    });

    return {
      message: 'Education added successfully',
      data: {
        id: education.id,
        schoolName: education.schoolName,
        fieldOfStudy: education.fieldOfStudy,
        qualification: education.qualification,
        startDate: education.startDate,
        endDate: education.endDate,
      },
    };
  }
}

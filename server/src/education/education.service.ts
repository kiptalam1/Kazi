import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateEducationDto } from './dto/create-education.dto.js';
import { CandidatesService } from '../candidates/candidates.service.js';
import { EducationApiResponse } from './dto/education-response.dto.js';
import { UpdateEducationDto } from './dto/update-education.dto.js';

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
  ): Promise<EducationApiResponse> {
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

  // update education;
  async updateEducation(
    userId: string,
    educationId: string,
    data: UpdateEducationDto,
  ): Promise<EducationApiResponse> {
    const candidate = await this.candidatesService.findByUserId(userId);

    const education = await this.prisma.education.findFirst({
      where: {
        id: educationId,
        candidateId: candidate.id,
      },
    });

    if (!education) {
      throw new NotFoundException('Education not found.');
    }

    const updatedEducation = await this.prisma.education.update({
      where: { id: educationId },
      data,
    });

    return {
      message: 'Education updated successfully',
      data: {
        id: updatedEducation.id,
        schoolName: updatedEducation.schoolName,
        fieldOfStudy: updatedEducation.fieldOfStudy,
        qualification: updatedEducation.qualification,
        startDate: updatedEducation.startDate,
        endDate: updatedEducation.endDate,
      },
    };
  }
}

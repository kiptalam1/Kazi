import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateEducationDto } from './dto/create-education.dto.js';
import { CandidatesService } from '../candidates/candidates.service.js';
import {
  CreatedEducationDto,
  EducationApiResponse,
} from './dto/education-response.dto.js';
import { UpdateEducationDto } from './dto/update-education.dto.js';

@Injectable()
export class EducationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly candidatesService: CandidatesService,
  ) { }

  // get my education;
  async getMyEducation(userId: string): Promise<CreatedEducationDto[]> {
    const candidate = await this.candidatesService.findByUserId(userId);

    const education = await this.prisma.education.findMany({
      where: {
        candidateId: candidate.id,
      },
      select: {
        id: true,
        schoolName: true,
        fieldOfStudy: true,
        qualification: true,
        city: true,
        country: true,
        startDate: true,
        endDate: true,
      },
    });
    return education;
  }

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
        city: education.city,
        country: education.country,
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

    const education = await this.findCandidateEducation(
      educationId,
      candidate.id,
    );

    const updatedEducation = await this.prisma.education.update({
      where: { id: education.id },
      data,
    });

    return {
      message: 'Education updated successfully',
      data: {
        id: updatedEducation.id,
        schoolName: updatedEducation.schoolName,
        fieldOfStudy: updatedEducation.fieldOfStudy,
        qualification: updatedEducation.qualification,
        city: updatedEducation.city,
        country: updatedEducation.country,
        startDate: updatedEducation.startDate,
        endDate: updatedEducation.endDate,
      },
    };
  }

  // remove education
  async removeEducation(userId: string, educationId: string) {
    const candidate = await this.candidatesService.findByUserId(userId);

    const education = await this.findCandidateEducation(
      educationId,
      candidate.id,
    );

    await this.prisma.education.delete({
      where: { id: education.id },
    });
  }

  // helpers
  private async findCandidateEducation(
    educationId: string,
    candidateId: string,
  ) {
    const education = await this.prisma.education.findFirst({
      where: {
        id: educationId,
        candidateId,
      },
      select: { id: true },
    });

    if (!education) {
      throw new NotFoundException('Education not found.');
    }

    return education;
  }
}

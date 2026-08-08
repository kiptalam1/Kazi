import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto.js';
import { CandidatesService } from '../candidates/candidates.service.js';
import { PrismaService } from '../prisma.service.js';
import { UpdateExperienceDto } from './dto/update-experience.dto.js';
import { ExperienceApiResponse } from './dto/responses/experience-response.dto.js';

@Injectable()
export class ExperienceService {
  constructor(
    private readonly candidatesService: CandidatesService,
    private readonly prisma: PrismaService,
  ) {}

  // add experience
  async addExperience(
    userId: string,
    data: CreateExperienceDto,
  ): Promise<ExperienceApiResponse> {
    const candidate = await this.candidatesService.findByUserId(userId);

    const newExperience = await this.prisma.experience.create({
      data: {
        candidateId: candidate.id,
        jobTitle: data.jobTitle,
        companyName: data.companyName,
        location: data.location,
        description: data.description,
        employmentType: data.employmentType,
        startDate: data.startDate,
        endDate: data.endDate,
        isCurrent: data.isCurrent,
      },
    });

    const {
      createdAt: _createdAt,
      updatedAt: _updatedAt,
      ...result
    } = newExperience;

    return {
      message: 'Experience added successfully',
      data: result,
    };
  }

  // update experience;
  async updateExperience(
    userId: string,
    experienceId: string,
    data: UpdateExperienceDto,
  ): Promise<ExperienceApiResponse> {
    const candidate = await this.candidatesService.findByUserId(userId);

    const experience = await this.prisma.experience.findFirst({
      where: {
        id: experienceId,
        candidateId: candidate.id,
      },
    });

    if (!experience) {
      throw new NotFoundException('Experience not found.');
    }

    const updatedExperience = await this.prisma.experience.update({
      where: {
        id: experienceId,
      },
      data,
    });

    const {
      createdAt: _createdAt,
      updatedAt: _updatedAt,
      ...result
    } = updatedExperience;

    return {
      message: 'Experience updated successfully',
      data: result,
    };
  }
}

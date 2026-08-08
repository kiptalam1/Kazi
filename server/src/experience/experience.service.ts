import { Injectable } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto.js';
import { CandidatesService } from '../candidates/candidates.service.js';
import { PrismaService } from '../prisma.service.js';
import { CreatedExperienceApiResponse } from './dto/responses/created-experience-response.dto.js';

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
  ): Promise<CreatedExperienceApiResponse> {
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
}

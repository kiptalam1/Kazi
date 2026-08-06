import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto.js';
import { UpdateApplicationDto } from './dto/update-application.dto.js';
import { PrismaService } from '../prisma.service.js';
import { UsersService } from '../users/users.service.js';
import { JobsService } from '../jobs/jobs.service.js';
import { CompanyMembersService } from '../company-members/company-members.service.js';

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jobsService: JobsService,
    private readonly companyMembersService: CompanyMembersService,
  ) { }

  // apply to a job;
  async create(userId: string, jobId: string, createApplicationDto: CreateApplicationDto) {
    // get user and its candidate fields;
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const candidate = user.candidate;
    if (!candidate) {
      throw new NotFoundException('candidate profile not found');
    }

    // check if job exists;
    const job = await this.jobsService.findById(jobId);

    // ensure user is not a member of company;
    const member = await this.companyMembersService.getMember(user.id, job.companyId);
    if (member) {
      throw new ForbiddenException('You are already a member of this company.');
    }

    const existing = await this.prisma.application.findUnique({
      where: {
        candidateId_jobId: {
          candidateId: candidate.id,
          jobId: job.id,
        },
      },
    });
    if (existing) {
      throw new ConflictException('You have already applied for this job.');
    }

    const application = await this.prisma.application.create({
      data: {
        coverLetter: createApplicationDto.coverLetter,
        candidateId: candidate.id,
        jobId: job.id,
      },
    });

    return {
      message: 'Application submitted successfully.',
      data: {
        id: application.id,
        status: application.status,
        createdAt: application.createdAt,
      },
    };
  }

  findAll() {
    return `This action returns all applications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}

import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto.js';
import { UpdateApplicationStatusDto } from './dto/update-application.dto.js';
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

    // check if job exists and is open;
    const job = await this.jobsService.findById(jobId);
    if (job.status === 'CLOSED') {
      throw new ForbiddenException('No longer accepting applications.');
    }

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

  // employer update application status;
  async updateStatus(
    userId: string,
    applicationId: string,
    updateApplicationStatusDto: UpdateApplicationStatusDto
  ) {
    // check if application exists;
    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        job: {
          select: {
            id: true,
            companyId: true,
            status: true,
          },
        },
      },
    });

    if (!application) {
      throw new NotFoundException('Application not found.');
    }

    //check membership;
    const member = await this.companyMembersService.getMember(userId, application.job.companyId);

    if (!member) {
      throw new ForbiddenException('Permission denied.');
    }

    // only allowed can update status;
    const allowedRoles = this.companyMembersService.canManageOperations(member.role);
    if (!allowedRoles) {
      throw new ForbiddenException('Permission denied.');
    }

    // do nothing if fields are the same;
    const statusChanged = updateApplicationStatusDto.status !== undefined && updateApplicationStatusDto.status !== application.status;

    const notesChanged = updateApplicationStatusDto.employerNotes !== undefined &&
      updateApplicationStatusDto.employerNotes !== application.employerNotes;

    if (!statusChanged && !notesChanged) {
      return {
        message: 'Nothing changed.',
        data: {
          id: application.id,
          status: application.status,
          updatedAt: application.updatedAt,
          reviewedAt: application.reviewedAt,
          employerNotes: application.employerNotes,
        },
      };
    }

    // now update
    const appUpdated = await this.prisma.
      application.update({
        where: {
          id: applicationId,
        },
        data: {
          status: updateApplicationStatusDto.status,
          employerNotes: updateApplicationStatusDto.employerNotes,
          reviewedAt: new Date(),
        },
      });

    return {
      message: 'Application updated successfully',
      data: {
        id: appUpdated.id,
        status: appUpdated.status,
        updatedAt: appUpdated.updatedAt,
        reviewedAt: appUpdated.reviewedAt,
        employerNotes: appUpdated.employerNotes,
      },
    };
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}

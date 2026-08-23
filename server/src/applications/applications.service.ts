import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto.js';
import { UpdateApplicationStatusDto } from './dto/update-application.dto.js';
import { PrismaService } from '../prisma.service.js';
import { UsersService } from '../users/users.service.js';
import { JobsService } from '../jobs/jobs.service.js';
import { CompanyMembersService } from '../company-members/company-members.service.js';
import { ApplicationStatus, FileType } from '../generated/prisma/enums.js';
import { CandidatesService } from '../candidates/candidates.service.js';
import {
  CandidateApplicationApiResponse,
  EmployerApplicationsResponseDto,
  EmployerFetchSingleApplicationResponseDto,
  QueryDto,
  SingleCandidateApplicationResponseDto,
} from './dto/application-response.dto.js';
import { Prisma } from '../generated/prisma/client.js';
import { GetQueryDto } from '../common/dto/query.dto.js';

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jobsService: JobsService,
    private readonly companyMembersService: CompanyMembersService,
    private readonly candidatesService: CandidatesService,
  ) { }

  // employer fetch single application;
  async employerFetchSingleApplication(
    userId: string,
    applicationId: string,
  ): Promise<EmployerFetchSingleApplicationResponseDto> {
    const application = await this.prisma.application.findUnique({
      where: {
        id: applicationId,
      },
      select: {
        id: true,
        coverLetter: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        reviewedAt: true,
        job: {
          select: {
            id: true,
            title: true,
            status: true,
            companyId: true,
            createdAt: true,
            experienceLevel: true,
          },
        },
        candidate: {
          select: {
            id: true,
            currentJobTitle: true,
            bio: true,
            headline: true,
            location: true,
            githubUrl: true,
            linkedinUrl: true,
            experienceLevel: true,
            availability: true,
            portfolioUrl: true,
            education: {
              select: {
                id: true,
                schoolName: true,
                fieldOfStudy: true,
                startDate: true,
                endDate: true,
                qualification: true,
              },
            },
            skills: true,
            salaryExpectation: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                avatar: {
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!application) {
      throw new NotFoundException('Application not found.');
    }

    const member = await this.companyMembersService.getMember(
      userId,
      application.job.companyId,
    );
    if (!member) {
      throw new ForbiddenException('Permission denied.');
    }
    const allowed = this.companyMembersService.canManageOperations(member.role);

    if (!allowed) {
      throw new ForbiddenException('Permission denied.');
    }

    return {
      ...application,
      candidate: {
        ...application.candidate,
        user: {
          ...application.candidate.user,
          avatar: application.candidate.user.avatar?.url ?? null,
        },
      },
    };
  }

  // fetch candidate single application;
  async findSingleCandidateApplication(
    userId: string,
    applicationId: string,
  ): Promise<SingleCandidateApplicationResponseDto> {
    const candidate = await this.candidatesService.findByUserId(userId);
    const application = await this.prisma.application.findUnique({
      where: {
        id: applicationId,
        candidateId: candidate.id,
      },
      select: {
        id: true,
        coverLetter: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        reviewedAt: true,
        job: {
          select: {
            id: true,
            status: true,
            createdAt: true,
            title: true,
            location: true,
            company: {
              select: {
                id: true,
                name: true,
                logoUrl: true,
              },
            },
          },
        },
      },
    });

    if (!application) {
      throw new NotFoundException('Application not found.');
    }
    return application;
  }

  // apply to a job;
  async create(
    userId: string,
    jobId: string,
    createApplicationDto: CreateApplicationDto,
  ) {
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
    const member = await this.companyMembersService.getMember(
      user.id,
      job.companyId,
    );
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

    if (createApplicationDto.resumeId) {
      const resume = await this.prisma.file.findFirst({
        where: {
          id: createApplicationDto.resumeId,
          candidateId: candidate.id,
          type: FileType.RESUME,
        },
      });

      if (!resume) {
        throw new BadRequestException(
          'Resume not found.'
        );
      }
    }
    const application = await this.prisma.application.create({
      data: {
        resumeId: createApplicationDto.resumeId || undefined,
        coverLetter: createApplicationDto.coverLetter || undefined,
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

  // return all of the candidate's job applications;
  async findCandidateApplications(
    userId: string,
    query: QueryDto,
  ): Promise<CandidateApplicationApiResponse> {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const candidate = await this.candidatesService.findByUserId(userId);

    const where: Prisma.ApplicationWhereInput = {
      candidateId: candidate.id,
    };
    if (query.status) {
      where.status = query.status;
    }
    const [applications, total] = await this.prisma.$transaction([
      this.prisma.application.findMany({
        where,
        take: limit,
        skip,
        select: {
          id: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          reviewedAt: true,
          coverLetter: true,
          job: {
            select: {
              id: true,
              title: true,
              location: true,
              isRemote: true,
              status: true,
              company: {
                select: {
                  id: true,
                  name: true,
                  logoUrl: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.application.count({ where }),
    ]);
    return {
      data: applications,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(applicationId: string) {
    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
    });
    if (!application) {
      throw new NotFoundException('Application not found.');
    }
    return application;
  }

  // employer update application status;
  async updateStatus(
    userId: string,
    applicationId: string,
    updateApplicationStatusDto: UpdateApplicationStatusDto,
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
    const member = await this.companyMembersService.getMember(
      userId,
      application.job.companyId,
    );

    if (!member) {
      throw new ForbiddenException('Permission denied.');
    }

    // only allowed can update status;
    const allowedRoles = this.companyMembersService.canManageOperations(
      member.role,
    );
    if (!allowedRoles) {
      throw new ForbiddenException('Permission denied.');
    }

    // do nothing if fields are the same;
    const statusChanged =
      updateApplicationStatusDto.status !== undefined &&
      updateApplicationStatusDto.status !== application.status;

    const notesChanged =
      updateApplicationStatusDto.employerNotes !== undefined &&
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
    const appUpdated = await this.prisma.application.update({
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

  // withdraw application;
  async withdraw(userId: string, applicationId: string) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!candidate) {
      throw new NotFoundException('Candidate profile not found.');
    }
    const application = await this.findById(applicationId);

    // check if application is mine;
    if (application.candidateId !== candidate.id) {
      throw new ForbiddenException('Permission denied.');
    }
    // check if application is already withdrawn;
    if (application.status === ApplicationStatus.WITHDRAWN) {
      throw new BadRequestException('Application has already been withdrawn');
    }
    // deny if rejected or hired;
    if (
      application.status === ApplicationStatus.REJECTED ||
      application.status === ApplicationStatus.HIRED
    ) {
      throw new BadRequestException(
        `You have already been ${application.status.toLowerCase()}`,
      );
    }
    const appWithdrawn = await this.prisma.application.update({
      where: { id: application.id },
      data: {
        status: ApplicationStatus.WITHDRAWN,
      },
    });

    return {
      message: 'Application withdrawn successfully',
      data: {
        id: appWithdrawn.id,
        status: appWithdrawn.status,
        createdAt: appWithdrawn.createdAt,
        updatedAt: appWithdrawn.updatedAt,
        jobId: appWithdrawn.jobId,
      },
    };
  }

  // employer get all candidates job applications;
  async getAllApplicationsByJob(
    userId: string,
    jobId: string,
    query: GetQueryDto,
  ): Promise<EmployerApplicationsResponseDto> {
    const { page, limit, status, search } = query;
    const skip = (page - 1) * limit;
    const where: Prisma.ApplicationWhereInput = { jobId };
    if (status) {
      where.status = status;
    }
    if (search) {
      where.candidate = {
        user: {
          OR: [
            {
              firstName: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              lastName: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        },
      };
    }
    const job = await this.jobsService.findById(jobId);
    const member = await this.companyMembersService.getMember(
      userId,
      job.companyId,
    );
    if (!member) {
      throw new ForbiddenException('Permission denied.');
    }
    const allowed = this.companyMembersService.canManageOperations(member.role);
    if (!allowed) {
      throw new ForbiddenException('Permission denied.');
    }

    const [applications, total] = await this.prisma.$transaction([
      this.prisma.application.findMany({
        where,
        take: limit,
        skip,
        select: {
          id: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          reviewedAt: true,
          coverLetter: true,
          candidate: {
            select: {
              id: true,
              headline: true,
              currentJobTitle: true,
              experienceLevel: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.application.count({ where }),
    ]);

    return {
      data: applications,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

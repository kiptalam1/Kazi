import { ApplicationStatus } from '@/features/common/types/common.types';

export interface ApplicationStatusCount {
  PENDING: number;
  REVIEWING: number;
  SHORTLISTED: number;
  INTERVIEW: number;
  OFFERED: number;
  HIRED: number;
  REJECTED: number;
  WITHDRAWN: number;
}

export interface RecentApplication {
  id: string;
  candidateName: string;
  jobTitle: string;
  appliedDate: string;
  status: ApplicationStatus;
}

export interface DashboardAnalytics {
  activeJobs: number;
  totalApplications: number;
  newApplicationsThisWeek: number;
  applicationsByStatus: ApplicationStatusCount;
  recentApplications: RecentApplication[];
}

import type { EmploymentType, FileType } from '@/features/common/types/common.types';

export type Experience = {
  employmentType: EmploymentType | null;
  id: string;
  jobTitle: string;
  companyName: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string | null;
};

export type EducationLevel =
  | 'PRIMARY'
  | 'SECONDARY'
  | 'HIGH_SCHOOL'
  | 'CERTIFICATE'
  | 'DIPLOMA'
  | 'ASSOCIATE'
  | 'BACHELORS'
  | 'POSTGRADUATE_DIPLOMA'
  | 'MASTERS'
  | 'DOCTORATE';

export type Education = {
  id: string;
  qualification: EducationLevel;
  schoolName: string;
  fieldOfStudy?: string | null;
  city?: string | null;
  country?: string | null;
  startDate: string;
  endDate?: string | null;
};

export type ResumeMimeType =
  | 'application/pdf'
  | 'application/msword'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export type Resume = {
  id: string;
  fileName: string;
  displayName?: string | null;
  size: number;
  mimeType: ResumeMimeType;
  url: string;
  type: FileType;
};

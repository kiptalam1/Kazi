export type ApplicationStatus =
  | 'PENDING'
  | 'REVIEWING'
  | 'WITHDRAWN'
  | 'INTERVIEW'
  | 'SHORTLISTED'
  | 'HIRED'
  | 'OFFERED'
  | 'REJECTED';

export type ExperienceLevel =
  'INTERN' | 'APPRENTICE' | 'JUNIOR' | 'MID' | 'SENIOR' | 'LEAD';

export type JobStatus = 'DRAFT' | 'PUBLISHED' | 'CLOSED' | 'ARCHIVED';

export type Company = {
  id: string;
  name: string;
  logoUrl: string | null;
}



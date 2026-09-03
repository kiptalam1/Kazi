'use client';

import CandidateEducation from '@/features/candidates/components/CandidateEducation';
import CandidateExperiences from '@/features/candidates/components/CandidateExperiences';
import CandidateResumes from '@/features/candidates/components/CandidateResumes';
import { ProfessionalInfo } from '@/features/candidates/components/ProfessionalInfo';
import { ProfileLinks } from '@/features/candidates/components/ProfileLinks';
import ProfileHeader from '@/features/user/components/ProfileHeader';

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-6xl space-y-4 p-4 sm:space-y-6 sm:py-8">
      <ProfileHeader />
      <ProfessionalInfo />
      <ProfileLinks />
      <CandidateExperiences />
      <CandidateEducation />
      <CandidateResumes />
    </main>
  );
}

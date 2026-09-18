'use client';

import CandidateEducation from '@/features/candidates/components/CandidateEducation';
import CandidateExperiences from '@/features/candidates/components/CandidateExperiences';
import CandidateResumes from '@/features/candidates/components/CandidateResumes';
import { ProfessionalInfo } from '@/features/candidates/components/ProfessionalInfo';
import { ProfileLinks } from '@/features/candidates/components/ProfileLinks';
import ProfileHeader from '@/features/user/components/ProfileHeader';

export default function ProfilePage() {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <ProfileHeader />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)] lg:items-start">
        <div className="space-y-6">
          <ProfessionalInfo />
          <CandidateExperiences />
          <CandidateEducation />
        </div>
        <aside className="space-y-6">
          <ProfileLinks />
          <CandidateResumes />
        </aside>
      </div>
    </main>
  );
}

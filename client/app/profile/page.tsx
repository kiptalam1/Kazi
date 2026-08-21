'use client';

import { ProfessionalInfo } from "@/features/candidates/components/ProfessionalInfo";
import { ProfileLinks } from "@/features/candidates/components/ProfileLinks";
import ProfileHeader from "@/features/user/components/ProfileHeader";

export default function ProfilePage() {
  return (
    <main className="p-4 sm:py-8 space-y-4 sm:space-y-6 max-w-6xl mx-auto">
      <ProfileHeader />
      <ProfessionalInfo />
      <ProfileLinks />
    </main >
  );
}

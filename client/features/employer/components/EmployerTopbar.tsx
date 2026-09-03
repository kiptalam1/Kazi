'use client';
import { CompanyLogo } from '@/components/ui/CompanyLogo';
import NavLink from '@/components/ui/NavLink';
import { Bell, BriefcaseBusiness, FileText, LayoutGrid } from 'lucide-react';

export default function EmployerTopbar() {
  return (
    <nav className="border-border-muted flex items-center justify-between border-b px-6 py-4 text-sm sm:px-8 sm:py-6">
      <CompanyLogo
        src="/favicon.ico"
        alt="Kazi logo"
        width={40}
        height={40}
        className="h-fit w-fit justify-self-start"
      />
      <div className="flex items-center gap-10">
        <NavLink
          href={'/employer/dashboard'}
          className="flex items-center gap-1"
        >
          <LayoutGrid size={20} />
          <span className="hidden sm:block">Dashboard</span>
        </NavLink>
        <NavLink href={'/employer/jobs'} className="flex items-center gap-1">
          <BriefcaseBusiness size={20} />
          <span className="hidden sm:block">Jobs</span>
        </NavLink>
        <NavLink
          href={'/employer/applicants'}
          className="flex items-center gap-1"
        >
          <FileText size={20} />
          <span className="hidden sm:block">Applicants</span>
        </NavLink>
        <NavLink
          href={'/employer/notifications'}
          className="flex items-center gap-1"
        >
          <Bell size={20} />
          <span className="hidden sm:block">Notifications</span>
        </NavLink>
        <NavLink href={'/employer'}>
          <Bell size={20} className="sm:hidden" />
          <span className="hidden sm:block">For Employers</span>
        </NavLink>
      </div>
    </nav>
  );
}

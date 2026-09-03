'use client';
import { CompanyLogo } from '@/components/ui/CompanyLogo';
import NavLink from '@/components/ui/NavLink';
import { Bell, BriefcaseBusiness, FileText, LayoutGrid, User } from 'lucide-react';
import useMyCompany from '../hooks/useMyCompany';
import FallbackAvatar from '@/components/ui/FallbackAvatar';

export default function EmployerTopbar() {
  const {
    data: company,
  } = useMyCompany();

  return (
    <nav className="border-border-muted flex items-center justify-between border-b px-4 py-4 text-sm sm:px-8 sm:py-6 gap-2">
      <CompanyLogo
        src="/favicon.ico"
        alt="Kazi logo"
        width={40}
        height={40}
        className="h-fit w-fit justify-self-start"
      />
      <div className="flex flex-1 sm:flex-0 items-center gap-4 sm:gap-10">
        <NavLink
          href={'/employer/dashboard'}
          className="flex flex-col sm:flex-row items-center gap-1"
        >
          <LayoutGrid size={20} />
          <span className="text-[9px] sm:text-sm ">Dashboard</span>
        </NavLink>
        <NavLink href={'/employer/jobs'}
          className="flex flex-col sm:flex-row items-center gap-1">
          <BriefcaseBusiness size={20} />
          <span className="text-[9px] sm:text-sm ">Jobs</span>
        </NavLink>
        <NavLink
          href={'/employer/applicants'}
          className="flex flex-col sm:flex-row items-center gap-1"
        >
          <FileText size={20} />
          <span className="text-[9px] sm:text-sm">Applicants</span>
        </NavLink>
        <NavLink
          href={'/employer/notifications'}
          className="flex flex-col sm:flex-row items-center gap-1"
        >
          <Bell size={20} />
          <span className="text-[9px] sm:text-sm">Notifications</span>
        </NavLink>
        <NavLink href={'/jobs'}
          className='flex flex-col sm:flex-row items-center gap-1'
        >
          <User size={20} />
          <span className="text-[9px] sm:text-sm">Candidate</span>
        </NavLink>
        <div>
          {
            company?.logoUrl ? (
              <CompanyLogo
                src={company.logoUrl}
                width={32}
                height={32}
                alt={company.name}
                className='w-auto h-auto'
              />
            ) : company ? (
              <FallbackAvatar value={company.name} />
            ) : null
          }
        </div>
      </div>
    </nav>
  );
}

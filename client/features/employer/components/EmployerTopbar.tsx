'use client';
import { CompanyLogo } from '@/components/ui/CompanyLogo';
import NavLink from '@/components/ui/NavLink';
import {
  Bell,
  BriefcaseBusiness,
  FileText,
  LayoutGrid,
  User,
} from 'lucide-react';
import useMyCompany from '../hooks/useMyCompany';
import FallbackAvatar from '@/components/ui/FallbackAvatar';
import { useEffect, useRef, useState } from 'react';
import ProfileDropdown from '@/components/ui/ProfileDropdown';

export default function EmployerTopbar() {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const { data: company } = useMyCompany();

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropdown(false);
      }
    }

    if (isOpenDropdown) {
      document.addEventListener('pointerdown', handlePointerDown);
    }

    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpenDropdown]);

  return (
    <nav className="border-border-muted flex items-center justify-center gap-10 border-b px-4 py-4 text-sm sm:px-6 sm:py-6 lg:justify-between">
      <CompanyLogo
        src="/favicon.ico"
        alt="Kazi logo"
        width={40}
        height={40}
        className="hidden h-fit w-fit justify-self-start sm:block"
      />
      <div className="flex w-full items-center justify-between gap-4 sm:flex-0 sm:gap-10 lg:flex-1">
        <NavLink
          href={'/employer/dashboard'}
          className="flex flex-col items-center gap-1 sm:flex-row"
        >
          <LayoutGrid size={20} />
          <span className="text-[9px] sm:text-sm">Dashboard</span>
        </NavLink>
        <NavLink
          href={'/employer/jobs'}
          className="flex flex-col items-center gap-1 sm:flex-row"
        >
          <BriefcaseBusiness size={20} />
          <span className="text-[9px] sm:text-sm">Jobs</span>
        </NavLink>
        <NavLink
          href={'/employer/applicants'}
          className="flex flex-col items-center gap-1 sm:flex-row"
        >
          <FileText size={20} />
          <span className="text-[9px] sm:text-sm">Applicants</span>
        </NavLink>
        <NavLink
          href={'/employer/notifications'}
          className="flex flex-col items-center gap-1 sm:flex-row"
        >
          <Bell size={20} />
          <span className="text-[9px] sm:text-sm">Notifications</span>
        </NavLink>
        <NavLink
          href={'/jobs'}
          className="flex flex-col items-center gap-1 sm:flex-row"
        >
          <User size={20} />
          <span className="text-[9px] sm:text-sm">Candidate</span>
        </NavLink>
        <div ref={dropDownRef} className="relative">
          <button type="button" onClick={() => setIsOpenDropdown(true)}>
            {company?.logoUrl ? (
              <CompanyLogo
                src={company.logoUrl}
                width={36}
                height={36}
                alt={company.name}
                className="h-auto w-auto"
              />
            ) : company ? (
              <FallbackAvatar value={company.name} className="size-9" />
            ) : null}
          </button>
          <ProfileDropdown
            isOpen={isOpenDropdown}
            onClose={() => setIsOpenDropdown(false)}
            href={'/employer/profile'}
          />
        </div>
      </div>
    </nav>
  );
}

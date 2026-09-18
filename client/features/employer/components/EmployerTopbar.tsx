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
import { usePathname, useRouter } from 'next/navigation';

export default function EmployerTopbar() {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const { data: company } = useMyCompany();
  const pathname = usePathname();
  const router = useRouter();

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

  if (pathname === '/employer/onboarding') {
    return (
      <nav
        aria-label="Company setup"
        className="border-border-muted flex items-center justify-between border-b px-6 py-4 sm:px-8 sm:py-6"
      >
        <button
          type="button"
          aria-label="Go to jobs page"
          onClick={() => router.push('/jobs')}
          className="focus-visible:outline-focus rounded-full focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <CompanyLogo
            src="/favicon.ico"
            alt="Kazi logo"
            width={40}
            height={40}
            className="h-auto w-auto"
          />
        </button>
        <span className="text-text-secondary text-sm font-medium">
          Company setup
        </span>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Employer navigation"
      className="border-border-muted relative flex items-center justify-center border-b px-4 py-4 text-sm sm:px-6 sm:py-6"
    >
      <CompanyLogo
        src="/favicon.ico"
        alt="Kazi logo"
        width={40}
        height={40}
        className="hidden h-auto w-auto sm:mr-auto sm:block"
      />
      <div className="flex w-full items-center justify-center sm:gap-10 lg:absolute lg:left-1/2 lg:w-auto lg:-translate-x-1/2">
        <div className="flex w-full min-w-max items-center justify-between sm:w-auto sm:justify-start sm:gap-6 lg:gap-8">
          <NavLink
            href={'/employer/dashboard'}
            className="flex flex-1 flex-col items-center justify-center gap-1 sm:flex-none sm:flex-row sm:justify-start"
          >
            <LayoutGrid size={20} />
            <span className="text-[9px] sm:text-sm">Dashboard</span>
          </NavLink>
          <NavLink
            href={'/employer/jobs'}
            className="flex flex-1 flex-col items-center justify-center gap-1 sm:flex-none sm:flex-row sm:justify-start"
          >
            <BriefcaseBusiness size={20} />
            <span className="text-[9px] sm:text-sm">Jobs</span>
          </NavLink>
          <NavLink
            href={'/employer/applicants'}
            className="flex flex-1 flex-col items-center justify-center gap-1 sm:flex-none sm:flex-row sm:justify-start"
          >
            <FileText size={20} />
            <span className="text-[9px] sm:text-sm">Applicants</span>
          </NavLink>
          <NavLink
            href={'/employer/notifications'}
            className="flex flex-1 flex-col items-center justify-center gap-1 sm:flex-none sm:flex-row sm:justify-start"
          >
            <Bell size={20} />
            <span className="text-[9px] sm:text-sm">Notifications</span>
          </NavLink>
          <NavLink
            href={'/jobs'}
            className="flex flex-1 flex-col items-center justify-center gap-1 sm:flex-none sm:flex-row sm:justify-start"
          >
            <User size={20} />
            <span className="text-[9px] sm:text-sm">Candidate</span>
          </NavLink>
        </div>
      </div>
      <div ref={dropDownRef} className="relative shrink-0">
        <button
          type="button"
          aria-label="Open company profile menu"
          aria-expanded={isOpenDropdown}
          aria-haspopup="menu"
          onClick={() => setIsOpenDropdown((previous) => !previous)}
          className="focus-visible:outline-focus flex size-9 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4"
        >
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
    </nav>
  );
}

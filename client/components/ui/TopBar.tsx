'use client';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { CompanyLogo } from './CompanyLogo';
import { Avatar } from './Avatar';
import { Bell, BriefcaseBusiness, FileText } from 'lucide-react';
import NavLink from './NavLink';
import FallbackAvatar from './FallbackAvatar';
import { useEffect, useRef, useState } from 'react';
import ProfileDropdown from './ProfileDropdown';

export default function TopBar() {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const { data, isPending, isError } = useAuth();

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

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpenDropdown]);

  if (isPending || isError || !data) {
    return null;
  }
  const user = data.data;

  return (
    <nav className="flex items-center justify-between border-b border-border-muted  text-sm px-6 sm:px-8 py-4 sm:py-6">
      <CompanyLogo
        src="/favicon.ico"
        alt="Kazi logo"
        width={40}
        height={40}
        className="w-fit h-fit justify-self-start"
      />
      <div className="flex items-center gap-10">
        <NavLink href={'/jobs'}>
          <BriefcaseBusiness size={20} className="sm:hidden" />
          <span className="hidden sm:block">Jobs</span>
        </NavLink>
        <NavLink href={'/applications'}>
          <FileText size={20} className="sm:hidden" />
          <span className="hidden sm:block">Applications</span>
        </NavLink>
        <NavLink href={'/notifications'}>
          <Bell size={20} className="sm:hidden" />
          <span className="hidden sm:block">Notifications</span>
        </NavLink>
        <NavLink href={'/employer'}>
          <Bell size={20} className="sm:hidden" />
          <span className="hidden sm:block">For Employers</span>
        </NavLink>
      </div>
      <div ref={dropDownRef} className="relative">
        <button
          onClick={() => setIsOpenDropdown((prev) => !prev)}
          className="cursor-pointer"
        >
          {user.avatar ? (
            <Avatar src={user.avatar} alt="avatar" width={36} height={36} />
          ) : (
            <FallbackAvatar value={user.firstName} className="size-9" />
          )}
        </button>
        {/* dropdown */}
        {isOpenDropdown && (
          <ProfileDropdown
            isOpen={isOpenDropdown}
            onClose={() => setIsOpenDropdown(false)}
          />
        )}
      </div>
    </nav>
  );
}

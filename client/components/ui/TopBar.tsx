'use client';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { CompanyLogo } from './CompanyLogo';
import { Avatar } from './Avatar';
import { Bell, BriefcaseBusiness, Circle, FileText, User } from 'lucide-react';
import NavLink from './NavLink';
import FallbackAvatar from './FallbackAvatar';
import { useEffect, useRef, useState } from 'react';
import ProfileDropdown from './ProfileDropdown';
import useAllNotifications from '@/features/notifications/hooks/useAllNotifications';

export default function TopBar() {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const { data, isPending, isError } = useAuth();
  let { data: notifications } = useAllNotifications();

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
  const forbidden = [
    'NEW_APPLICATION',
    'JOB_CREATED',
    'APPLICATION_STATUS_CHANGED',
  ];
  notifications = notifications ?? [];
  notifications = notifications.filter(
    (notif) => !forbidden.includes(notif.type),
  );

  return (
    <nav className="border-border-muted flex items-center justify-between gap-4 border-b px-6 py-4 text-sm sm:px-8 sm:py-6">
      <CompanyLogo
        src="/favicon.ico"
        alt="Kazi logo"
        width={40}
        height={40}
        className="h-auto w-auto justify-self-start"
      />
      <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        <NavLink
          href={'/jobs'}
          className="flex flex-col items-center gap-1 sm:flex-row"
        >
          <BriefcaseBusiness size={20} className="" />
          <span className="text-[9px] sm:text-sm">Jobs</span>
        </NavLink>
        <NavLink
          href={'/applications'}
          className="flex flex-col items-center gap-1 sm:flex-row"
        >
          <FileText size={20} className="" />
          <span className="text-[9px] sm:text-sm">Applications</span>
        </NavLink>
        <NavLink
          href={'/notifications'}
          className="flex flex-col items-center gap-1 sm:flex-row"
        >
          <span className="relative">
            <Bell size={20} />
            {notifications?.some((notif) => !notif.isRead) && (
              <Circle className="fill-brand-active absolute -top-1 -right-1 size-2" />
            )}
          </span>
          <span className="text-[9px] sm:text-sm">Notifications</span>
        </NavLink>
        <NavLink
          href={'/employer'}
          className="flex flex-col items-center gap-1 sm:flex-row"
        >
          <User size={20} className="" />
          <span className="text-[9px] sm:text-sm">Employers</span>
        </NavLink>
      </div>
      <div ref={dropDownRef} className="relative">
        <button
          type="button"
          aria-label="Open profile menu"
          aria-expanded={isOpenDropdown}
          aria-haspopup="menu"
          onClick={() => setIsOpenDropdown((prev) => !prev)}
          className="focus-visible:outline-focus flex size-9 cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4"
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
            href={'/profile'}
          />
        )}
      </div>
    </nav>
  );
}

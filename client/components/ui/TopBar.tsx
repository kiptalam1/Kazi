'use client';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { CompanyLogo } from './CompanyLogo';
import { Avatar } from './Avatar';
import { Bell, BriefcaseBusiness, FileText, User } from 'lucide-react';
import NavLink from './NavLink';

export default function TopBar() {
  const { data, isPending, isError } = useAuth();
  if (isPending || isError || !data) {
    return null;
  }
  const user = data.data;

  return (
    <nav className="flex items-center justify-between border-b border-border-muted shadow-xs text-sm px-6 sm:px-8 py-4 sm:py-6">
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
      </div>
      {user.avatar ? (
        <Avatar
          src={user.avatar}
          alt="avatar"
          width={32}
          height={32}
          className="w-auto h-auto"
        />
      ) : (
        <button className="border border-border p-2 sm:p-3 rounded-full text-text-disabled">
          <User size={16} />
        </button>
      )}
    </nav>
  );
}

'use client';

import { useAuth } from "@/features/auth/hooks/useAuth";
import { CompanyLogo } from "./CompanyLogo";
import Link from "next/link";

export default function TopBar() {
  const { data: user, isPending } = useAuth();
  if (isPending) {
    return null;
  }
  if (!user) {
    return null;
  }

  // console.log(user);

  return (
    <nav
      className="flex items-center justify-between p-4 border-b border-border-muted shadow-xs">
      <CompanyLogo
        src="/favicon.ico"
        alt="Kazi logo"
        width={40}
        height={40}
        className="w-fit h-fit justify-self-start"
      />
      <Link href={'/jobs'}>Jobs</Link>
    </nav>
  );
}

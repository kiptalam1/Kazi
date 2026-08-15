'use client';

import { useAuth } from "@/features/auth/hooks/useAuth";

export default function TopBar() {
  const { data: user, isPending } = useAuth();
  if (isPending) {
    return null;
  }
  if (!user) {
    return null;
  }

  return <nav className="">TopBar</nav>;
}

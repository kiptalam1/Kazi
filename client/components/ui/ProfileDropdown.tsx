import { useLogout } from '@/features/auth/hooks/useLogout';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type ProfileDropdownProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ProfileDropdown({
  isOpen,
  onClose,
}: ProfileDropdownProps) {
  const { mutateAsync: logout } = useLogout();
  const router = useRouter();

  if (!isOpen) {
    return null;
  }

  async function handleLogout() {
    await logout();
    onClose();
    router.replace('/');
  }

  return (
    <div className="border-border absolute top-full right-0 z-50 mt-6 flex h-auto w-60 flex-col border bg-white shadow-xs">
      <Link
        href={'/profile'}
        onClick={onClose}
        className="text-text-secondary hover:bg-background-muted flex items-center gap-2 px-4 py-3 text-sm"
      >
        <User className="size-4" />
        Profile
      </Link>
      <button
        type="button"
        onClick={handleLogout}
        className="text-danger hover:bg-background-muted flex items-center gap-2 px-4 py-3 duration-75"
      >
        {' '}
        <LogOut className="size-4" />
        Log Out
      </button>
    </div>
  );
}

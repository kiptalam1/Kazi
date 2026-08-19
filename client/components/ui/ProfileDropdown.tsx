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
    <div className="absolute z-50 right-0 border border-border bg-white top-full w-60 h-auto mt-6 shadow-xs flex flex-col">
      <Link
        href={'/profile'}
        className="text-text-secondary flex items-center gap-2 px-4 py-3 hover:bg-background-muted text-sm"
      >
        <User className="size-4 " />
        Profile
      </Link>
      <button
        type="button"
        onClick={handleLogout}
        className="text-danger flex items-center gap-2 t hover:bg-background-muted px-4 py-3 duration-75"
      >
        {' '}
        <LogOut className="size-4" />
        Log Out
      </button>
    </div>
  );
}

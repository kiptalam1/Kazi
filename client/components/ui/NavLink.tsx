import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavlinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function NavLink({
  href,
  children,
  className = '',
}: NavlinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`focus-visible:outline-focus rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${isActive ? 'text-brand-active font-medium' : 'hover:text-brand-hover'} ${className}`}
    >
      {children}
    </Link>
  );
}

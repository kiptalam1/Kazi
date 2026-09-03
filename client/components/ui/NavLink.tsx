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
      className={`${isActive ? 'text-brand-active font-medium' : 'hover:text-brand-hover'} ${className}`}
    >
      {children}
    </Link>
  );
}

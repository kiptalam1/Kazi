import { getInitials } from '@/lib/utils/getInitials';

type FallbackAvatarProps = {
  value: string;
  className?: string;
};

export default function FallbackAvatar({
  value,
  className,
}: FallbackAvatarProps) {
  return (
    <div
      className={`border border-border p-2 rounded-full size-8 flex items-center justify-center ${className}`}
    >
      {getInitials(value)}
    </div>
  );
}

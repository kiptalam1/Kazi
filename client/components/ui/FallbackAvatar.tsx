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
      className={`border-border flex size-8 items-center justify-center rounded-full border p-2 ${className}`}
    >
      {getInitials(value)}
    </div>
  );
}

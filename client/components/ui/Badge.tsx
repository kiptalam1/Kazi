import { twMerge } from 'tailwind-merge';

type BadgeProps = React.ComponentProps<'span'>;

export default function Badge({ className, ...props }: BadgeProps) {
  const baseStyles =
    'text-xs text-text-secondary font-medium border border-border-muted shadow-xs inline-flex bg-background-subtle py-1 px-2.5 rounded-full';

  return <span {...props} className={twMerge(baseStyles, className)} />;
}

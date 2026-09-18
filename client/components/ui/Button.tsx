import { twMerge } from 'tailwind-merge';

type ButtonProps = React.ComponentProps<'button'> & {
  variant?: 'primary' | 'accent' | 'basic';
  className?: string;
};

export default function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    'px-4 py-2 rounded-none font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary:
      'bg-brand-primary text-text-inverse hover:bg-brand-hover focus:ring-brand-primary',
    accent:
      'bg-accent text-accent-content hover:bg-accent-hover focus:ring-accent',
    basic:
      'bg-transparent hover:bg-background-muted focus:ring-focus border border-border',
  };

  return (
    <button
      {...props}
      className={twMerge(baseStyles, variantStyles[variant], className)}
    />
  );
}

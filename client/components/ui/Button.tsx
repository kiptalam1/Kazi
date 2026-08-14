type ButtonProps = React.ComponentProps<'button'> & {
  variant?: 'primary' | 'accent' | 'basic';
  className?: string;
};

export default function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  const baseStyles =
    'px-4 py-2 rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-brand-primary text-text-inverse hover:bg-brand-hover focus:ring-brand-primary',
    accent: 'bg-accent text-text-inverse hover:bg-accent-hover focus:ring-accent',
    basic: 'bg-inherit hover:bg-gray-50 focus:ring-gray-100 border border-border',
  };

  return (
    <button {...props} className={`${baseStyles} ${variantStyles[variant]} ${className}`}></button>
  );
}

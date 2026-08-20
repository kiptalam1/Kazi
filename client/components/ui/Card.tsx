type CardProps = React.ComponentProps<'div'> & {
  className?: string;
};

export default function Card({ className, ...props }: CardProps) {
  const baseStyles = 'p-4 border border-border-muted hover:border-focus transition-all duration-150';

  return <div {...props} className={`${baseStyles} ${className ?? ''}`} />;
}

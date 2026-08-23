type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
  className = "",
  children,
  ...props
}: SelectProps) {
  return (
    <select
      className={`w-full rounded-md border border-border-muted bg-background px-3 py-2 text-sm text-text-primary outline-none focus:border-brand-active disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

type InputProps = React.ComponentProps<'input'>;

export default function Input({
  className,
  type = 'text',
  ...props
}: InputProps) {
  const baseStyles =
    'w-full rounded-none border border-border px-4 py-2 outline-none placeholder:text-placeholder placeholder:text-sm focus:ring-2 focus:ring-focus focus:outline-none disabled:cursor-not-allowed disabled:opacity-50';
  return (
    <input {...props} type={type} className={`${baseStyles} ${className}`} />
  );
}

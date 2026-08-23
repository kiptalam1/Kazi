type TextareaProps = React.ComponentProps<'textarea'>;

export default function Textarea({
  className,
  ...props
}: TextareaProps) {
  const baseStyles =
    'w-full border border-border outline-none focus:outline-none focus:ring-2 focus:ring-focus px-4 py-2 rounded-md placeholder:text-placeholder placeholder:text-sm disabled:cursor-not-allowed disabled:opacity-50';
  return (
    <textarea {...props} className={`${baseStyles} ${className}`} />
  );
}

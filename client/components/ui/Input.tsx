
type InputProps = React.ComponentProps<"input">;

export default function Input({
  className,
  type = "text",
  ...props
}: InputProps) {

  const baseStyles = "w-full border border-border outline-none focus:outline-none focus:ring-2 focus:ring-focus px-4 py-2 rounded-md placeholder:text-placeholder placeholder:text-sm disabled:cursor-not-allowed disabled:opacity-50";
  return (
    <input
      {...props}
      type={type}
      className={`${baseStyles} ${className}`}
    />
  )
}


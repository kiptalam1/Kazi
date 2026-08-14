type LabelProps = React.ComponentProps<"label"> & {
  className?: string;
};
export default function Label({ className, ...props }: LabelProps) {
  const baseStyles = "text-text-muted font-medium text-sm";
  return (
    <label
      {...props}
      className={`${baseStyles} ${className}`}
    />
  );
}


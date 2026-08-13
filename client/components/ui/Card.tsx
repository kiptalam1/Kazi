
type CardProps = React.ComponentProps<"div"> & {
  className?: string;
};

export default function Card({
  className,
  ...props
}: CardProps) {

  const baseStyles = "rounded-lg bg-background-muted p-4 border border-border"

  return (
    <div
      {...props}
      className={`${baseStyles} ${className ?? ""}`}
    />
  );
}


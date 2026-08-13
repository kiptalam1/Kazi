type ButtonProps = {
  children: React.ReactNode;
  type?: "submit" | "button" | "reset";
  variant?: "primary" | "accent";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}

export default function Button({
  children,
  type = "button",
  variant = "primary",
  className,
  onClick,
  disabled = false,
  ariaLabel,
}: ButtonProps) {

  const baseStyles = "px-4 py-2 rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    primary: "bg-brand-primary text-text-inverse hover:bg-brand-hover focus:ring-brand-primary",
    accent: "bg-accent text-text-inverse hover:bg-accent-hover focus:ring-accent",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}   >
      {children}
    </button>
  )
}


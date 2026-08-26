import type { InputHTMLAttributes } from 'react';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

export default function Checkbox({ className = '', ...props }: CheckboxProps) {
  const baseStyles =
    'size-4 cursor-pointer appearance-none rounded-sm border border-border-strong bg-background transition-colors checked:border-brand-active checked:bg-brand-active focus:outline-none focus:ring-2 focus:ring-brand-active/30 disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <input
      type="checkbox"
      className={`${baseStyles} ${className}`}
      {...props}
    />
  );
}

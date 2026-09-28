import { Loader2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
};
export default function Spinner({ className }: Props) {
  const baseStyles = 'size-5 animate-spin';
  return <Loader2 className={twMerge(baseStyles, className)} />;
}

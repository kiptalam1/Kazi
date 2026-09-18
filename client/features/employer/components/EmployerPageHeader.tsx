import type { ReactNode } from 'react';

type Props = {
  title: string;
  description: string;
  action?: ReactNode;
};

export default function EmployerPageHeader({
  title,
  description,
  action,
}: Props) {
  return (
    <header className="border-border-muted flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-text-primary text-2xl font-semibold tracking-tight">
          {title}
        </h1>
        <p className="text-text-muted mt-2 text-sm">{description}</p>
      </div>
      {action}
    </header>
  );
}

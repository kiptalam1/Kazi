'use client';
import Button from '@/components/ui/Button';
import { CompanyLogo } from '@/components/ui/CompanyLogo';
import Spinner from '@/components/ui/Spinner';
import useMyOneApplication from '@/features/applications/hooks/useMyOneApplication';
import { useWithdrawApplication } from '@/features/applications/hooks/useWithdrawApplication';
import { getApiErrorMessage } from '@/lib/api/error';
import { canWithdrawApplication } from '@/lib/utils/canWithdrawApplication';
import formattedDate from '@/lib/utils/formattedDate';
import { getInitials } from '@/lib/utils/getInitials';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function ApplicationPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: application,
    isError,
    isPending,
    error,
  } = useMyOneApplication(id);
  const withdrawMutation = useWithdrawApplication();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="mx-auto p-6 text-center">{getApiErrorMessage(error)}</p>
    );
  }

  const job = application.job;
  const company = job.company;

  async function handleWithdraw(applicationId: string) {
    await withdrawMutation.mutateAsync(applicationId);
    router.push('/applications');
  }

  return (
    <main className="space-y-4 p-4 sm:space-y-6 sm:py-8">
      <section>
        <div className="mb-5 flex items-center justify-between">
          <Link
            href={'/applications'}
            aria-label="Back to applications"
            className="text-text-secondary hover:bg-background-muted hover:text-text-primary inline-flex size-8 items-center justify-center rounded-md duration-75"
          >
            <ArrowLeft className="size-4" />
          </Link>
          {canWithdrawApplication(application.status) && (
            <Button
              onClick={() => handleWithdraw(application.id)}
              disabled={withdrawMutation.isPending}
              className="p-1 text-xs font-semibold"
            >
              {withdrawMutation.isPending ? 'Withdrawing...' : 'Withdraw'}
            </Button>
          )}
        </div>
        <h1 className="text-text-muted mb-6 text-sm font-semibold tracking-wide uppercase">
          Application
        </h1>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            {company.logoUrl ? (
              <CompanyLogo
                src={company.logoUrl}
                alt={company.name}
                width={32}
                height={32}
                className="h-auto w-auto"
              />
            ) : (
              <div className="border-border-muted flex size-8 items-center justify-center rounded-full border p-2">
                {getInitials(company.name)}
              </div>
            )}
            <p>{company.name}</p>
          </div>
          <div className="pl-11">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {job.title}
            </h2>
            <div className="text-text-secondary flex items-center gap-4 text-sm">
              <p>{job.location}</p>
              <span className="bg-background-muted text-text-muted w-fit px-2 py-1 text-xs">
                {job.isRemote ? 'REMOTE' : 'ON-SITE'}
              </span>
            </div>
            <span
              className={`bg-background-muted mt-3 inline-flex w-fit px-2 py-1 text-xs ${application.status === 'REJECTED' ? 'text-danger' : 'text-text-secondary'}`}
            >
              {application.status}
            </span>
          </div>
          <p className="text-text-secondary mt-6 text-sm">
            Applied on {formattedDate(application.createdAt)}
          </p>
        </div>
      </section>

      <section className="border-border-muted border-t pt-6">
        <h2 className="text-sm font-medium">Cover letter</h2>
        <p className="text-text-secondary mt-3 text-sm leading-6 whitespace-pre-line">
          {application.coverLetter}
        </p>
      </section>
    </main>
  );
}

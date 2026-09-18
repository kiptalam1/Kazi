'use client';
import QueryError from '@/app/error';
import Loader from '@/app/loading';
import Button from '@/components/ui/Button';
import { CompanyLogo } from '@/components/ui/CompanyLogo';
import ConfirmModal from '@/components/ui/ConfirmModal';
import ApplicationStatusBadge from '@/features/applications/components/ApplicationStatusBadge';
import useMyOneApplication from '@/features/applications/hooks/useMyOneApplication';
import { useWithdrawApplication } from '@/features/applications/hooks/useWithdrawApplication';
import { canWithdrawApplication } from '@/lib/utils/canWithdrawApplication';
import formattedDate from '@/lib/utils/formattedDate';
import { getInitials } from '@/lib/utils/getInitials';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

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
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <QueryError error={error} />;
  }

  if (!application) {
    return <p className="mx-auto p-6 text-center">Application not found.</p>;
  }

  const job = application.job;
  const company = job.company;

  async function handleWithdraw(applicationId: string) {
    await withdrawMutation.mutateAsync(applicationId);
    setIsWithdrawModalOpen(false);
    router.push('/applications');
  }

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <section>
        <div className="mb-8 flex items-center justify-between">
          <Link
            href={'/applications'}
            aria-label="Back to applications"
            className="text-text-secondary hover:bg-background-muted hover:text-text-primary focus-visible:outline-focus inline-flex size-8 items-center justify-center duration-75 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <ArrowLeft className="size-4" />
          </Link>
          {canWithdrawApplication(application.status) && (
            <Button
              variant="basic"
              onClick={() => setIsWithdrawModalOpen(true)}
              disabled={withdrawMutation.isPending}
              className="border-danger text-danger hover:bg-danger/10 focus:ring-danger rounded-none px-3 py-2 text-xs font-semibold"
            >
              Withdraw application
            </Button>
          )}
        </div>
        <div className="border-border-muted border-b pb-8">
          <p className="text-text-muted mb-5 text-sm font-semibold tracking-wide uppercase">
            Application details
          </p>
          <div className="flex items-start gap-4">
            {company.logoUrl ? (
              <CompanyLogo
                src={company.logoUrl}
                alt={company.name}
                width={32}
                height={32}
                className="h-auto w-auto"
              />
            ) : (
              <div className="border-border-muted flex size-10 items-center justify-center rounded-full border text-sm font-semibold">
                {getInitials(company.name)}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-text-secondary text-sm font-medium">
                {company.name}
              </p>
              <h1 className="text-text-primary mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                {job.title}
              </h1>
              <p className="text-text-muted mt-3 text-sm">
                {job.location ?? 'Location not specified.'}
                <span className="mx-2">·</span>
                {job.isRemote ? 'Remote' : 'On-site'}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <ApplicationStatusBadge status={application.status} />
            <p className="text-text-muted text-sm">
              Applied on {formattedDate(application.createdAt)}
            </p>
          </div>
        </div>
      </section>

      <section className="border-border-muted grid gap-8 border-b pb-8 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)]">
        <div className="max-w-3xl">
          <h2 className="text-text-primary font-semibold">Cover letter</h2>
          <p className="text-text-secondary border-border-muted mt-4 border p-5 text-sm leading-7 whitespace-pre-line">
            {application.coverLetter ||
              'No cover letter was included with this application.'}
          </p>
        </div>
        <div>
          <h2 className="text-text-primary font-semibold">
            Application activity
          </h2>
          <ol className="border-border-muted mt-4 space-y-5 border-l pl-5">
            <li className="relative">
              <span className="bg-brand-primary absolute top-1 left-[-1.35rem] size-2.5" />
              <p className="text-text-primary text-sm font-medium">
                Application submitted
              </p>
              <p className="text-text-muted mt-1 text-xs">
                {formattedDate(application.createdAt)}
              </p>
            </li>
            <li className="relative">
              <span className="bg-border-strong absolute top-1 left-[-1.35rem] size-2.5" />
              <p className="text-text-primary text-sm font-medium">
                {application.reviewedAt
                  ? 'Application reviewed'
                  : 'Awaiting employer review'}
              </p>
              <p className="text-text-muted mt-1 text-xs">
                {application.reviewedAt
                  ? formattedDate(application.reviewedAt)
                  : 'No review date yet'}
              </p>
            </li>
          </ol>
        </div>
      </section>

      <ConfirmModal
        open={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onConfirm={() => handleWithdraw(application.id)}
        isPending={withdrawMutation.isPending}
        title="Withdraw this application? You will no longer be considered for this role."
      />
    </main>
  );
}

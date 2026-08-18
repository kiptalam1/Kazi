'use client';
import { CompanyLogo } from '@/components/ui/CompanyLogo';
import Spinner from '@/components/ui/Spinner';
import useMyOneApplication from '@/features/applications/hooks/useMyOneApplication';
import { getApiErrorMessage } from '@/lib/api/error';
import formattedDate from '@/lib/utils/formattedDate';
import { getInitials } from '@/lib/utils/getInitials';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ApplicationPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: application,
    isError,
    isPending,
    error,
  } = useMyOneApplication(id);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center mx-auto p-6">{getApiErrorMessage(error)}</p>
    );
  }

  const job = application.job;
  const company = job.company;

  return (
    <main className="p-4 sm:py-8 space-y-4 sm:space-y-6 ">
      <section>
        <Link
          href={'/applications'}
          className="mb-5 size-8 inline-flex items-center justify-center rounded-md text-text-secondary  hover:bg-background-muted hover:text-text-primary duration-75"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="mb-6 text-sm font-semibold uppercase text-text-muted tracking-wide">
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
                className="w-auto h-auto"
              />
            ) : (
              <div className="rounded-full flex items-center justify-center p-2 size-8 border border-border-muted">
                {getInitials(company.name)}
              </div>
            )}
            <p>{company.name}</p>
          </div>
          <div className="pl-11">
            <h2 className=" text-xl sm:text-2xl tracking-tight font-semibold">
              {job.title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-text-secondary ">
              <p>{job.location}</p>
              <span className="w-fit bg-background-muted text-xs py-1 px-2 text-text-muted">
                {job.isRemote ? 'REMOTE' : 'ON-SITE'}
              </span>
            </div>
            <span
              className={`mt-3 inline-flex w-fit px-2 py-1 text-xs bg-background-muted ${application.status === 'REJECTED' ? 'text-danger' : 'text-text-secondary'}`}
            >
              {application.status}
            </span>
          </div>
          <p className="mt-6 text-sm text-text-secondary">
            Applied on {formattedDate(application.createdAt)}
          </p>
        </div>
      </section>

      <section className="border-t border-border-muted pt-6">
        <h2 className="text-sm font-medium">Cover letter</h2>
        <p className="mt-3 text-sm leading-6 text-text-secondary whitespace-pre-line">
          {application.coverLetter}
        </p>
      </section>
    </main>
  );
}

'use client';

import Button from "@/components/ui/Button";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import FallbackAvatar from "@/components/ui/FallbackAvatar";
import Spinner from "@/components/ui/Spinner";
import useCompanyJobs from "@/features/employer/hooks/useCompanyJobs";
import useMyCompany from "@/features/employer/hooks/useMyCompany";
import { getApiErrorMessage } from "@/lib/api/error";
import { Plus } from "lucide-react";

export default function EmployerDashboard() {
  const { data: company, isPending: isCompanyPending, isError: isCompanyError, error: companyError } = useMyCompany();
  const { data: jobs, isPending: isJobsPending, isError: isJobsError, error: jobsError } = useCompanyJobs();

  if (isCompanyPending || isJobsPending) {
    return <div className="min-h-[50vh] flex items-center justify-center">
      <Spinner />
    </div>
  }

  if (isCompanyError || isJobsError) {
    return <p className="text-center text-sm text-text-muted">{getApiErrorMessage(companyError || jobsError)}</p>
  }

  return (
    <main className="p-4 sm:py-6 space-y-4">
      <section className="flex items-center justify-between gap-4">
        {
          !company && <p>Company not found!</p>
        }
        {
          !jobs && <p>Jobs not found!</p>
        }
        <div className="flex-1 p-4 space-y-2">
          <div className="flex items-center gap-3">
            {
              company.logoUrl ?
                <CompanyLogo
                  src={company.logoUrl}
                  alt={company.name}
                  height={32}
                  width={32}
                  className='w-auto h-auto'
                /> :
                <FallbackAvatar
                  value={company.name}
                />
            }
            <h2 className="text-lg">{company.name}</h2>
          </div>
          <p className="text-sm text-text-secondary ">{company.industry}</p>
          <p className="text-accent-content text-sm">{company.website}</p>
          <p className="text-text-muted text-sm">{company.location}</p>
        </div>
        <Button className="flex text-sm items-center gap-1 font-extralight rounded-none">
          <Plus className="size-5" />
          Post a Job
        </Button>
      </section>

      {
        jobs && (
          <section>
            <div className='border border-border flex flex-col gap-1 items-center w-fit p-4 px-6'>
              <h3>
                {jobs.filter((job) => (job.status === 'PUBLISHED')).length}
              </h3>
              <p className='text-xs text-text-muted'>Active jobs</p>
            </div>
          </section>
        )
      }

    </main>

  );
}

'use client';

import Button from '@/components/ui/Button';
import { CompanyLogo } from '@/components/ui/CompanyLogo';
import FallbackAvatar from '@/components/ui/FallbackAvatar';
import Spinner from '@/components/ui/Spinner';
import useCompanyJobs from '@/features/employer/hooks/useCompanyJobs';
import useMyCompany from '@/features/employer/hooks/useMyCompany';
import useAnalytics from '@/features/employer/hooks/useAnalytics';
import { getApiErrorMessage } from '@/lib/api/error';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import PostjobModal from '@/features/employer/components/modals/PostjobModal';
import RecentApplications from '@/features/employer/components/RecentApplications';
import ApplicationByStatusCount from '@/features/employer/components/ApplicationByStatusCount';
import DashboardOverview from '@/features/employer/components/DashboardOverview';

export default function EmployerDashboard() {
  const {
    data: company,
    isPending: isCompanyPending,
    isError: isCompanyError,
    error: companyError,
  } = useMyCompany();
  const {
    data: jobs,
    isPending: isJobsPending,
    isError: isJobsError,
    error: jobsError,
  } = useCompanyJobs();
  const {
    data: analytics,
    isPending: isAnalyticsPending,
    isError: isAnalyticsError,
    error: analyticsError,
  } = useAnalytics();
  const [openjobModal, setOpenJobModal] = useState(false);

  if (isCompanyPending || isJobsPending || isAnalyticsPending) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isCompanyError || isJobsError || isAnalyticsError) {
    return (
      <p className="text-text-muted text-center text-sm">
        {getApiErrorMessage(companyError || jobsError || analyticsError)}
      </p>
    );
  }

  return (
    <>
      {/* Company Header */}
      <section className="border-border-muted flex items-center justify-between gap-4 border-b pb-6">
        {!company && <p>Company not found!</p>}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            {company?.logoUrl ? (
              <CompanyLogo
                src={company.logoUrl}
                alt={company.name}
                height={32}
                width={32}
                className="h-auto w-auto"
              />
            ) : (
              <FallbackAvatar value={company?.name || ''} />
            )}
            <h1 className="text-2xl font-semibold">{company?.name}</h1>
          </div>
          <div className="text-text-secondary items-center space-y-1 text-sm">
            {company?.industry && <p>{company.industry}</p>}
            {company?.website && <p>{company.website}</p>}
            {company?.location && <p>{company.location}</p>}
          </div>
        </div>
        <Button
          type="button"
          onClick={() => setOpenJobModal(true)}
          className="flex items-center gap-1 self-start rounded-none text-sm font-extralight"
        >
          <Plus className="size-5" />
          Post a Job
        </Button>
      </section>

      {/* Analytics Metrics */}
      {analytics && (
        <>
          <DashboardOverview
            applicationsByStatus={analytics.applicationsByStatus}
            newApplicationsThisWeek={analytics.newApplicationsThisWeek}
            totalApplications={analytics.totalApplications}
            activeJobs={analytics.activeJobs}
          />
          <ApplicationByStatusCount
            applicationsByStatus={analytics.applicationsByStatus}
          />
          {analytics.recentApplications.length > 0 && (
            <RecentApplications
              recentApplications={analytics.recentApplications}
            />
          )}
        </>
      )}

      {
        <PostjobModal
          open={openjobModal}
          onClose={() => setOpenJobModal(false)}
          companySlug={company.slug}
        />
      }
    </>
  );
}

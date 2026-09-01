'use client';

import Button from "@/components/ui/Button";
import { CompanyLogo } from "@/components/ui/CompanyLogo";
import FallbackAvatar from "@/components/ui/FallbackAvatar";
import Spinner from "@/components/ui/Spinner";
import useCompanyJobs from "@/features/employer/hooks/useCompanyJobs";
import useMyCompany from "@/features/employer/hooks/useMyCompany";
import useAnalytics from "@/features/employer/hooks/useAnalytics";
import { getApiErrorMessage } from "@/lib/api/error";
import { Plus, TrendingUp } from "lucide-react";
import { useState } from "react";
import PostjobModal from "@/features/employer/components/modals/PostjobModal";

export default function EmployerDashboard() {
  const { data: company, isPending: isCompanyPending, isError: isCompanyError, error: companyError } = useMyCompany();
  const { data: jobs, isPending: isJobsPending, isError: isJobsError, error: jobsError } = useCompanyJobs();
  const { data: analytics, isPending: isAnalyticsPending, isError: isAnalyticsError, error: analyticsError } = useAnalytics();
  const [openjobModal, setOpenJobModal] = useState(false);

  if (isCompanyPending || isJobsPending || isAnalyticsPending) {
    return <div className="min-h-[50vh] flex items-center justify-center">
      <Spinner />
    </div>
  }

  if (isCompanyError || isJobsError || isAnalyticsError) {
    return <p className="text-center text-sm text-text-muted">{getApiErrorMessage(companyError || jobsError || analyticsError)}</p>
  }

  return (
    <main className="p-4 sm:py-6 space-y-6">
      {/* Company Header */}
      <section className="flex items-center justify-between gap-4 pb-6 border-b border-border-muted">
        {
          !company && <p>Company not found!</p>
        }
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            {
              company?.logoUrl ?
                <CompanyLogo
                  src={company.logoUrl}
                  alt={company.name}
                  height={32}
                  width={32}
                  className='w-auto h-auto'
                /> :
                <FallbackAvatar
                  value={company?.name || ''}
                />
            }
            <h1 className="text-2xl font-semibold">{company?.name}</h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-text-secondary">
            {company?.industry && <p>{company.industry}</p>}
            {company?.website && <p>{company.website}</p>}
            {company?.location && <p>{company.location}</p>}
          </div>
        </div>
        <Button
          type='button'
          onClick={() => setOpenJobModal(true)}
          className="flex text-sm items-center gap-1 font-extralight rounded-none">
          <Plus className="size-5" />
          Post a Job
        </Button>
      </section>

      {/* Analytics Metrics */}
      {analytics && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Dashboard Overview</h2>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Active Jobs */}
            <div className="border border-border-muted p-4 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm text-text-secondary">Active Jobs</p>
                <TrendingUp className="size-4 text-brand-primary" />
              </div>
              <h3 className="text-3xl font-bold text-text-primary">{analytics.activeJobs}</h3>
              <p className="text-xs text-text-muted">Published listings</p>
            </div>

            {/* Total Applications */}
            <div className="border border-border-muted p-4 space-y-1">
              <p className="text-sm text-text-secondary">Total Applications</p>
              <h3 className="text-3xl font-bold text-text-primary">{analytics.totalApplications}</h3>
              <p className="text-xs text-text-muted">All time</p>
            </div>

            {/* New This Week */}
            <div className="border border-border-muted p-4 space-y-1">
              <p className="text-sm text-text-secondary">New This Week</p>
              <h3 className="text-3xl font-bold text-brand-primary">{analytics.newApplicationsThisWeek}</h3>
              <p className="text-xs text-text-muted">Last 7 days</p>
            </div>

            {/* In Pipeline */}
            <div className="border border-border-muted p-4 space-y-1">
              <p className="text-sm text-text-secondary">In Pipeline</p>
              <h3 className="text-3xl font-bold text-text-primary">
                {analytics.applicationsByStatus.PENDING + analytics.applicationsByStatus.REVIEWING + analytics.applicationsByStatus.SHORTLISTED}
              </h3>
              <p className="text-xs text-text-muted">Pending review</p>
            </div>
          </div>
        </section>
      )}

      {/* Application Status Breakdown */}
      {analytics && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Application Status</h2>
          <div className="border border-border-muted">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-0 divide-x divide-border-muted">
              {Object.entries(analytics.applicationsByStatus).map(([status, count]) => (
                <div key={status} className="p-4 text-center space-y-1">
                  <p className="text-xs text-text-muted uppercase">{status}</p>
                  <h3 className="text-2xl font-bold text-text-primary">{count}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Applications */}
      {analytics && analytics.recentApplications.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Applications</h2>
          <div className="border border-border-muted overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-border-muted">
                <tr>
                  <th className="text-left p-4 font-semibold text-text-primary">Candidate</th>
                  <th className="text-left p-4 font-semibold text-text-primary">Position</th>
                  <th className="text-left p-4 font-semibold text-text-primary">Applied</th>
                  <th className="text-left p-4 font-semibold text-text-primary">Status</th>
                </tr>
              </thead>
              <tbody>
                {analytics.recentApplications.map((app, idx) => (
                  <tr key={app.id} className={idx !== analytics.recentApplications.length - 1 ? "border-b border-border-muted" : ""}>
                    <td className="p-4 text-text-primary">{app.candidateName}</td>
                    <td className="p-4 text-text-secondary">{app.jobTitle}</td>
                    <td className="p-4 text-text-muted text-xs">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-2 py-1 text-xs font-medium border border-border-muted text-text-primary">
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {
        <PostjobModal
          open={openjobModal}
          onClose={() => setOpenJobModal(false)}
        />
      }
    </main>
  );
}

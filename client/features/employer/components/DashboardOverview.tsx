import { TrendingUp } from 'lucide-react';
import type { ApplicationStatusCount } from '../types/analytics.types';

type Analytics = {
  activeJobs: number;
  totalApplications: number;
  newApplicationsThisWeek: number;
  applicationsByStatus: ApplicationStatusCount;
};

export default function DashboardOverview({
  activeJobs,
  totalApplications,
  newApplicationsThisWeek,
  applicationsByStatus,
}: Analytics) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Dashboard Overview</h2>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Active Jobs */}
        <div className="border-border-muted space-y-1 border p-4">
          <div className="flex items-center justify-between">
            <p className="text-text-secondary text-sm">Active Jobs</p>
            <TrendingUp className="text-brand-primary size-4" />
          </div>
          <h3 className="text-text-primary text-3xl font-bold">{activeJobs}</h3>
          <p className="text-text-muted text-xs">Published listings</p>
        </div>

        {/* Total Applications */}
        <div className="border-border-muted space-y-1 border p-4">
          <p className="text-text-secondary text-sm">Total Applications</p>
          <h3 className="text-text-primary text-3xl font-bold">
            {totalApplications}
          </h3>
          <p className="text-text-muted text-xs">All time</p>
        </div>

        {/* New This Week */}
        <div className="border-border-muted space-y-1 border p-4">
          <p className="text-text-secondary text-sm">New This Week</p>
          <h3 className="text-brand-primary text-3xl font-bold">
            {newApplicationsThisWeek}
          </h3>
          <p className="text-text-muted text-xs">Last 7 days</p>
        </div>

        {/* In Pipeline */}
        <div className="border-border-muted space-y-1 border p-4">
          <p className="text-text-secondary text-sm">In Pipeline</p>
          <h3 className="text-text-primary text-3xl font-bold">
            {applicationsByStatus.PENDING +
              applicationsByStatus.REVIEWING +
              applicationsByStatus.SHORTLISTED}
          </h3>
          <p className="text-text-muted text-xs">Pending review</p>
        </div>
      </div>
    </section>
  );
}

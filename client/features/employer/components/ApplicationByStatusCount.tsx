import type { ApplicationStatusCount } from '../types/analytics.types';

export default function ApplicationByStatusCount({
  applicationsByStatus,
}: {
  applicationsByStatus: ApplicationStatusCount;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Application Status</h2>
      <div className="border-border-muted border">
        <div className="divide-border-muted grid grid-cols-2 gap-0 divide-x sm:grid-cols-4 lg:grid-cols-8">
          {Object.entries(applicationsByStatus).map(([status, count]) => (
            <div key={status} className="space-y-1 p-4 text-center">
              <p className="text-text-muted text-xs uppercase">{status}</p>
              <h3 className="text-text-primary text-2xl font-bold">{count}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

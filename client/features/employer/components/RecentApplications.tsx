import { RecentApplication } from '../types/analytics.types';
import ApplicationStatusBadge from '@/features/applications/components/ApplicationStatusBadge';

export default function RecentApplications({
  recentApplications,
}: {
  recentApplications: RecentApplication[];
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Recent Applications</h2>
      <div className="border-border-muted overflow-hidden border">
        <table className="w-full text-sm">
          <thead className="border-border-muted border-b">
            <tr>
              <th className="text-text-primary p-4 text-left font-semibold">
                Candidate
              </th>
              <th className="text-text-primary p-4 text-left font-semibold">
                Position
              </th>
              <th className="text-text-primary hidden p-4 text-left font-semibold sm:block">
                Applied
              </th>
              <th className="text-text-primary p-4 text-left font-semibold">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {recentApplications.map((app, idx) => (
              <tr
                key={app.id}
                className={
                  idx !== recentApplications.length - 1
                    ? 'border-border-muted border-b'
                    : ''
                }
              >
                <td className="text-text-primary p-4">{app.candidateName}</td>
                <td className="text-text-secondary p-4">{app.jobTitle}</td>
                <td className="text-text-muted hidden p-4 text-xs sm:block">
                  {new Date(app.appliedDate).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <ApplicationStatusBadge status={app.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

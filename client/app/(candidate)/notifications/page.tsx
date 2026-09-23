'use client';

import QueryError from '@/app/error';
import Loader from '@/app/loading';
import NotificationCard from '@/features/notifications/components/NotificationCard';
import useAllNotifications from '@/features/notifications/hooks/useAllNotifications';

export default function CandidateNotificationsPage() {
  const { data, isPending, isError, error } = useAllNotifications();

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <QueryError error={error} />;
  }

  const notifications = data ?? [];

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="border-border-muted flex items-center justify-between gap-5 border-b pb-6 sm:items-start">
        <h1 className="text-text-primary text-2xl font-semibold tracking-tight">
          My Notifications
        </h1>
        {
          <p className="text-text-muted text-sm">
            {notifications.length}{' '}
            {notifications.length === 1 ? 'notification' : 'notifications'}
          </p>
        }
      </div>

      <section className="space-y-3">
        {notifications.length === 0 && (
          <div className="py-8">
            <p className="text-text-secondary text-center text-sm">
              Your Notifications will appear here.
            </p>
          </div>
        )}
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </section>
    </main>
  );
}

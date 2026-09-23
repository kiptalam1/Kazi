import { Circle, Mail } from 'lucide-react';
import { Notification } from '../types/common.types';

type Props = {
  notification: Notification;
};
export default function NotificationCard({ notification }: Props) {
  return (
    <article className="border-border space-y-2 border p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 font-medium">
            {notification.title}
            {!notification.isRead && (
              <Circle className="text-brand-active size-2 fill-current" />
            )}
          </h2>
          <p className="text-text-secondary mt-1 text-sm wrap-break-word">
            {notification.message}
          </p>
        </div>
        {!notification.isRead && (
          <button
            type="button"
            aria-label="Mark notification as read"
            className="shrink-0 rounded-full p-2"
          >
            <span className="text-brand-active hover:text-brand-hover hidden cursor-pointer text-sm sm:block">
              Mark as Read
            </span>
            <Mail className="text-text-muted size-4 sm:hidden" />
          </button>
        )}
      </div>
    </article>
  );
}

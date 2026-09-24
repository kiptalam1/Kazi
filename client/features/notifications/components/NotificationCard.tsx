import { Circle, Mail, Trash2 } from 'lucide-react';
import { Notification } from '../types/common.types';
import formatRelativeTime from '@/lib/utils/relativeFormattedTime';
import useMarkReadNotification from '../hooks/useMarkReadNotification';
import useDeleteNotification from '../hooks/useDeleteNotification';
import { MouseEvent } from 'react';

type Props = {
  notification: Notification;
  onNavigate: (notification: Notification) => void;
};

export default function NotificationCard({ notification, onNavigate }: Props) {
  const { mutate: markRead, isPending: isReading } = useMarkReadNotification();
  const { mutate: deleteNotification, isPending: isDeleting } =
    useDeleteNotification();

  function handleMarkRead(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    markRead(notification.id);
  }

  function handleDeleteNotification(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    deleteNotification(notification.id);
  }

  return (
    <article
      onClick={() => onNavigate(notification)}
      className={`border-border hover:border-brand-hover space-y-2 border p-4 ${!notification.isRead && 'bg-background-muted'}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="flex items-baseline gap-2 font-medium sm:items-center">
            {notification.title}
            {!notification.isRead && (
              <Circle className="text-brand-active size-2 fill-current" />
            )}
          </h2>
          <p className="text-text-secondary mt-1 text-sm wrap-break-word">
            {notification.message}
          </p>
        </div>
        <div className="flex flex-col-reverse items-center gap-1 sm:flex-row sm:items-center">
          {!notification.isRead && (
            <button
              type="button"
              disabled={isReading}
              onClick={handleMarkRead}
              aria-label="Mark notification as read"
              className="shrink-0 cursor-pointer rounded-full p-3"
            >
              <span className="text-brand-active hover:text-brand-hover disabled:text-text-disabled hidden text-sm sm:block">
                Mark as Read
              </span>
              <Mail className="text-text-muted size-4 sm:hidden" />
            </button>
          )}
          <button
            type="button"
            onClick={handleDeleteNotification}
            disabled={isDeleting}
            className="hover:bg-background-contrast hover:text-danger disabled:text-text-disabled shrink-0 rounded-full p-3"
          >
            <Trash2 className="text-text-muted hover:text-danger disabled:text-text-disabled size-4" />
          </button>
          <p className="text-text-muted text-center text-xs sm:w-16 sm:text-right">
            {formatRelativeTime(notification.createdAt)}
          </p>
        </div>
      </div>
    </article>
  );
}

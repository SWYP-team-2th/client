import type { NotificationBadgeProps } from './types';

export default function NotificationBadge(props: NotificationBadgeProps) {
  if (props.type === 'count') {
    if (!props.count) return null;

    return (
      <span className="flex h-4 w-fit min-w-4 px-1 items-center justify-center rounded-full bg-notification-badge text-white text-label-4">
        {props.count > 99 ? '99+' : props.count}
      </span>
    );
  }

  return (
    <span className="flex h-2 w-2 items-center justify-center rounded-full bg-notification-badge text-white" />
  );
}

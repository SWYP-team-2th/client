import { useQuery } from '@tanstack/react-query';
import { request } from './config';

interface NotificationPresentResponse {
  present: boolean;
}

export function useGetNotificationPresent() {
  return useQuery<NotificationPresentResponse>({
    queryKey: ['notificationPresent'],
    queryFn: () =>
      request({
        method: 'GET',
        url: '/notifications/present',
      }),
  });
}

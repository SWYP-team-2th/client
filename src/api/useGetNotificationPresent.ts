import { useQuery } from '@tanstack/react-query';
import { request } from './config';
import { getAccessToken } from '@/components/login/Auth/token';

interface NotificationPresentResponse {
  present: boolean;
}

export function useGetNotificationPresent() {
  const accessToken = getAccessToken();

  return useQuery<NotificationPresentResponse>({
    queryKey: ['notificationPresent'],
    queryFn: () =>
      request({
        method: 'GET',
        url: '/notifications/present',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    enabled: !!accessToken,
  });
}

import { useMutation } from '@tanstack/react-query';
import { request } from './config';

interface PatchNotificationRequest {
  notificationId: number;
}

export default function usePatchNotification() {
  return useMutation({
    mutationFn: async (data: PatchNotificationRequest) => {
      return request({
        method: 'PATCH',
        url: `/notifications/${data.notificationId}`,
      });
    },
  });
}

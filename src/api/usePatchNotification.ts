import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from './config';

interface PatchNotificationRequest {
  notificationId: number;
}

export default function usePatchNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PatchNotificationRequest) => {
      return request({
        method: 'PATCH',
        url: `/notifications/${data.notificationId}`,
      });
    },
    onSuccess: () => {
      // 알림 읽음 처리 후 알림 상태를 다시 조회
      queryClient.invalidateQueries({ queryKey: ['notificationPresent'] });
    },
  });
}

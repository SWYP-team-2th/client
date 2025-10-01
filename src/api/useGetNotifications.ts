import { useInfiniteQuery } from '@tanstack/react-query';
import { request } from '@/api/config';
import { NotificationResponse } from '@/types/notification';

export function useGetNotifications(size: number = 10) {
  return useInfiniteQuery<NotificationResponse>({
    queryKey: ['notifications', size],
    queryFn: ({ pageParam = null }) =>
      request({
        method: 'GET',
        url: '/notifications',
        params: {
          cursor: pageParam,
          size,
        },
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext || lastPage.data.length === 0) {
        return undefined;
      }
      return lastPage.nextCursor;
    },
  });
}

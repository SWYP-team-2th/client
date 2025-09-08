import { useInfiniteQuery } from '@tanstack/react-query';
import { request } from '@/api/config';
import { getAccessToken } from '@/components/login/Auth/token';
import { FeedType } from '@/types/feed';
import { Pageable } from '@/types/pageable';

export function useGetFeed(size: number) {
  const accessToken = getAccessToken();

  return useInfiniteQuery<Pageable<FeedType>>({
    queryKey: ['feed', size],
    queryFn: ({ pageParam = null }) =>
      request({
        method: 'GET',
        url: '/posts/feed',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
    enabled: !!accessToken,
  });
}

import { useInfiniteQuery } from '@tanstack/react-query';
import { request } from '@/api/config';
import { getAccessToken } from '@/components/login/Auth/token';
import { FeedType } from '@/types/feed';
import { Pageable } from '@/types/pageable';

export default function useGetFeed(size: number) {
  const accessToken = getAccessToken();

  return useInfiniteQuery({
    queryKey: ['feed', size],
    queryFn: async ({ pageParam }: { pageParam: number | null }) => {
      return request<Pageable<FeedType>>({
        method: 'GET',
        url: '/posts/feed',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          cursor: pageParam,
          size,
        },
      });
    },
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext || lastPage.data.length === 0) {
        return undefined;
      }
      return lastPage.nextCursor;
    },
    enabled: !!accessToken,
  });
}

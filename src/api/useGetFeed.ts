import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { request } from '@/api/config';
import { getAccessToken } from '@/components/login/Auth/token';
import { FeedType } from '@/types/feed';
import { Pageable } from '@/types/pageable';

export default function useGetFeed(
  size: number,
  options?: Omit<
    UseInfiniteQueryOptions<
      Pageable<FeedType>,
      Error,
      InfiniteData<Pageable<FeedType>, unknown>
    >,
    'queryKey' | 'queryFn'
  >,
) {
  const accessToken = getAccessToken();

  return useInfiniteQuery<Pageable<FeedType>>({
    queryKey: ['feed', size],
    queryFn: async ({ pageParam = null }) => {
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
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext || lastPage.data.length === 0) {
        return undefined;
      }
      return lastPage.nextCursor;
    },
    enabled: !!accessToken,
    ...options,
  });
}

import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { request } from './config';
import { Pageable } from '@/types/pageable';
import { UserPost } from '@/types/user-post';

interface UseGetParticipatedVoteListOptions {
  userId: string;
  options?: UseSuspenseInfiniteQueryOptions<
    Pageable<UserPost>,
    Error,
    InfiniteData<Pageable<UserPost>, unknown>,
    Pageable<UserPost>,
    readonly unknown[],
    unknown
  >;
}

export function useGetParticipatedVoteList({
  userId,
  options,
}: UseGetParticipatedVoteListOptions) {
  return useSuspenseInfiniteQuery<Pageable<UserPost>>({
    queryFn: ({ pageParam = null }) =>
      request({
        method: 'GET',
        url: `/posts/users/${userId}/voted`,
        params: {
          cursor: pageParam,
          size: 10,
        },
      }),
    queryKey: ['posts', 'users', userId, 'voted'],
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext || lastPage.data.length === 0) {
        return undefined;
      }

      return lastPage.nextCursor;
    },
    ...options,
  });
}

import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { request } from './config';
import { Pageable } from '@/types/pageable';
import { UserPost } from '@/types/user-post';

interface UseGetMyVoteListOptions {
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

export function useGetMyVoteList({ userId, options }: UseGetMyVoteListOptions) {
  return useSuspenseInfiniteQuery<Pageable<UserPost>>({
    queryFn: ({ pageParam = null }) =>
      request({
        method: 'GET',
        url: `/posts/users/${userId}`,
        params: {
          cursor: pageParam,
          size: 10,
        },
      }),
    queryKey: ['my-vote-list', userId],
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

// TODO: useGetParticipatedVoteList.ts 파일로 이동
export function useGetParticipatedVoteList(
  options?: UseSuspenseInfiniteQueryOptions<
    Pageable<UserPost>,
    Error,
    InfiniteData<Pageable<UserPost>, unknown>,
    Pageable<UserPost>,
    readonly unknown[],
    unknown
  >,
) {
  const { userId } = useParams<{ userId: string }>();

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
    queryKey: ['my-participated-vote-list', userId],
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

import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { request } from './config';
import { Pageable } from '@/types/pageable';

interface Vote {
  id: number;
  bestPickedImageUrl: string;
  shareUrl: string;
  createdAt: string;
}

export function useGetMyVoteList(
  options?: UseSuspenseInfiniteQueryOptions<
    Pageable<Vote>,
    Error,
    InfiniteData<Pageable<Vote>, unknown>,
    Pageable<Vote>,
    readonly unknown[],
    unknown
  >,
) {
  const { userId } = useParams<{ userId: string }>();

  return useSuspenseInfiniteQuery<Pageable<Vote>>({
    queryFn: ({ pageParam = null }) =>
      request({
        method: 'GET',
        url: `/posts/users/${userId}`,
        params: {
          cursor: pageParam,
          size: 10,
        },
      }),
    queryKey: ['my-vote-list'],
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

export function useGetParticipatedVoteList(
  options?: UseSuspenseInfiniteQueryOptions<
    Pageable<Vote>,
    Error,
    InfiniteData<Pageable<Vote>, unknown>,
    Pageable<Vote>,
    readonly unknown[],
    unknown
  >,
) {
  const { userId } = useParams<{ userId: string }>();

  return useSuspenseInfiniteQuery<Pageable<Vote>>({
    queryFn: ({ pageParam = null }) =>
      request({
        method: 'GET',
        url: `/posts/users/${userId}/voted`,
        params: {
          cursor: pageParam,
          size: 10,
        },
      }),
    queryKey: ['my-participated-vote-list'],
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

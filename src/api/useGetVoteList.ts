import {
  InfiniteData,
  useSuspenseInfiniteQuery,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query';
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
  return useSuspenseInfiniteQuery<Pageable<Vote>>({
    queryFn: ({ pageParam = null }) =>
      request({
        method: 'GET',
        url: '/posts/user/me',
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjMiLCJpYXQiOjE3NDA2Mzg1MzQsImlzcyI6InN3eXA4dGVhbTIiLCJleHAiOjM4MTQyMzg1MzR9.CcTPwu-kthkfSqcAfA2N1wth77kbbOUe0Ama0P6SdTs`,
        },
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
  return useSuspenseInfiniteQuery<Pageable<Vote>>({
    queryFn: ({ pageParam = null }) =>
      request({
        method: 'GET',
        url: '/posts/user/voted',
        params: {
          cursor: pageParam,
          size: 10,
        },
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjMiLCJpYXQiOjE3NDA2Mzg1MzQsImlzcyI6InN3eXA4dGVhbTIiLCJleHAiOjM4MTQyMzg1MzR9.CcTPwu-kthkfSqcAfA2N1wth77kbbOUe0Ama0P6SdTs`,
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

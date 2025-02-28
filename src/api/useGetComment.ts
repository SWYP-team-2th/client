import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { request } from './config';
import { Pageable } from '@/types/pageable';

interface AuthorType {
  userId: number;
  nickname: string;
  profileUrl: string;
}

interface CommentType {
  commentId: number;
  content: string;
  author: AuthorType;
  voteId: number | null;
  createdAt: string;
}

export default function useGetComment(
  postId: number,
  size: number,
  options?: Partial<
    UseInfiniteQueryOptions<
      Pageable<CommentType>,
      Error,
      InfiniteData<Pageable<CommentType>, unknown>
    >
  >,
) {
  return useInfiniteQuery<Pageable<CommentType>>({
    queryFn: ({ pageParam = null }) =>
      request({
        method: 'GET',
        url: `/posts/${postId}/comments`,
        params: {
          cursor: pageParam,
          size,
        },
      }),
    queryKey: ['comments', postId, size],
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

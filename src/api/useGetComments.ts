import { useInfiniteQuery } from '@tanstack/react-query';
import { request } from './config';
import { CommentsResponse } from '@/types/comment';

export function useGetComments(postId: number, size: number = 10) {
  return useInfiniteQuery<CommentsResponse>({
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
      if (!lastPage.comments.hasNext || lastPage.comments.data.length === 0) {
        return undefined;
      }
      return lastPage.comments.nextCursor;
    },
  });
}

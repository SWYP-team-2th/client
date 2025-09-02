import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { request } from './config';
import { CommentsResponse } from '@/types/comment';

export default function useGetComments(
  postId: number,
  size: number = 10,
  options?: Partial<UseQueryOptions<CommentsResponse, Error>>,
) {
  return useQuery<CommentsResponse>({
    queryFn: () =>
      request({
        method: 'GET',
        url: `/posts/${postId}/comments`,
        params: {
          cursor: null,
          size,
        },
      }),
    queryKey: ['comments', postId, size],
    ...options,
  });
}

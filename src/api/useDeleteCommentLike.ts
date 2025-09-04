import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from './config';

export default function useDeleteCommentLike(
  options?: UseMutationOptions<void, Error, number>,
) {
  return useMutation<void, Error, number>({
    mutationFn: (commentLikeId: number) => {
      console.log('DELETE comment like request:', { commentLikeId });
      return request<void>({
        method: 'DELETE',
        url: `/comment-likes/${commentLikeId}`,
      });
    },
    ...options,
  });
}

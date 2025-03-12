import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from '@/api/config';

interface DeleteCommentType {
  postId: number;
  commentId: number;
}

export function useDeleteComment(
  options?: UseMutationOptions<void, Error, DeleteCommentType>,
) {
  return useMutation<void, Error, DeleteCommentType>({
    mutationFn: ({ postId, commentId }) =>
      request({
        method: 'DELETE',
        url: `/posts/${postId}/comments/${commentId}`,
      }),
    ...options,
  });
}

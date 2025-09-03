import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from '@/api/config';

interface DeleteCommentType {
  postId: number;
  commentId: number;
}

interface DeleteCommentResponse {
  commentId: number;
}

export function useDeleteComment(
  options?: UseMutationOptions<DeleteCommentResponse, Error, DeleteCommentType>,
) {
  return useMutation({
    mutationFn: ({ postId, commentId }: DeleteCommentType) =>
      request<DeleteCommentResponse>({
        method: 'DELETE',
        url: `/posts/${postId}/comments/${commentId}`,
      }),

    ...options,
  });
}

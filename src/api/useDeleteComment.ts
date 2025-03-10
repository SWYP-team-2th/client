import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query';
import { request } from '@/api/config';

interface DeleteCommentParams {
  postId: number;
  commentId: number;
}

export function useDeleteComment(
  options?: UseMutationOptions<void, Error, DeleteCommentParams>,
) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteCommentParams>({
    mutationFn: ({ postId, commentId }) =>
      request({
        method: 'DELETE',
        url: `/posts/${postId}/comments/${commentId}`,
      }),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
    ...options,
  });
}

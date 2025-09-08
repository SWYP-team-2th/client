import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from './config';

interface DeleteCommentLikeResponse {
  commentLikeId: null;
  likeCount: number;
}

interface DeleteCommentLikeParams {
  commentId: number;
  commentLikeId: number;
}

export default function useDeleteCommentLike(
  options?: UseMutationOptions<
    DeleteCommentLikeResponse,
    Error,
    DeleteCommentLikeParams
  >,
) {
  return useMutation<DeleteCommentLikeResponse, Error, DeleteCommentLikeParams>(
    {
      mutationFn: ({ commentId, commentLikeId }: DeleteCommentLikeParams) => {
        return request<DeleteCommentLikeResponse>({
          method: 'DELETE',
          url: `/comment-likes/${commentId}/${commentLikeId}`,
        });
      },
      ...options,
    },
  );
}

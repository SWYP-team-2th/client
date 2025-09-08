import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from './config';

interface PostCommentLikeResponse {
  commentLikeId: number;
  likeCount: number;
}

export default function usePostCommentLike(
  options?: UseMutationOptions<PostCommentLikeResponse, Error, number>,
) {
  return useMutation<PostCommentLikeResponse, Error, number>({
    mutationFn: (commentId: number) => {
      return request<PostCommentLikeResponse>({
        method: 'POST',
        url: `/comment-likes/${commentId}`,
        data: {},
      });
    },
    ...options,
  });
}

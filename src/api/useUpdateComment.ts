import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from '@/api/config';

interface UpdateCommentType {
  postId: number;
  commentId: number;
  content: string;
}

interface UpdateCommentResponse {
  commentId: number;
}

export default function useUpdateComment(
  options?: UseMutationOptions<UpdateCommentResponse, Error, UpdateCommentType>,
) {
  return useMutation({
    mutationFn: ({ postId, commentId, content }: UpdateCommentType) =>
      request<UpdateCommentResponse>({
        method: 'PATCH',
        url: `/posts/${postId}/comments/${commentId}`,
        data: { content },
      }),

    ...options,
  });
}

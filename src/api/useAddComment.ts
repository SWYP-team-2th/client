import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from '@/api/config';

interface AddCommentVariables {
  postId: number;
  content: string;
}

interface AddCommentResponse {
  commentId: number;
}

export default function useAddComment(
  options?: UseMutationOptions<AddCommentResponse, Error, AddCommentVariables>,
) {
  return useMutation({
    mutationFn: ({ postId, content }: AddCommentVariables) =>
      request<AddCommentResponse>({
        method: 'POST',
        url: `/posts/${postId}/comments`,
        data: { content },
      }),

    ...options,
  });
}

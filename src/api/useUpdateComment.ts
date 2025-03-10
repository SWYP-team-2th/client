import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '@/api/config';

interface UpdateCommentType {
  postId: number;
  commentId: number;
  content: string;
}

export default function useEditComment() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateCommentType>({
    mutationFn: ({ postId, commentId, content }) =>
      request({
        method: 'POST',
        url: `/posts/${postId}/comments/${commentId}`,
        data: { content },
      }),

    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });
}

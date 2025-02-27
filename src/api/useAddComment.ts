import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '@/api/config';

interface AddCommentVariables {
  postId: number;
  content: string;
}

interface AddCommentResponse {
  commentId: number;
  content: string;
  voteId: number | null;
  createdAt: string;
  author: {
    userId: number;
    nickname: string;
    profileUrl: string;
  };
}

export default function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation<AddCommentResponse, Error, AddCommentVariables>({
    mutationFn: ({ postId, content }) => {
      const accessToken =
        localStorage.getItem('accessToken') ||
        'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJpYXQiOjE3NDAyOTQyMzEsImlzcyI6InN3eXA4dGVhbTIiLCJleHAiOjMzMjc2Mjk0MjMxfQ.gqA245tRiBQB9owKRWIpX1we1T362R-xDTt4YT9AhRY';

      return request({
        method: 'POST',
        url: `/posts/${postId}/comments`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json;charset=UTF-8',
        },
        data: {
          content,
        },
      });
    },

    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },

    onError: (error) => {
      console.error('댓글 작성 에러:', error);
    },
  });
}

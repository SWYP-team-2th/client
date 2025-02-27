import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '@/api/config';

export default function useVote(postId: number) {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, number>({
    mutationFn: (imageId: number) => {
      const accessToken =
        'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJpYXQiOjE3NDAyOTQyMzEsImlzcyI6InN3eXA4dGVhbTIiLCJleHAiOjMzMjc2Mjk0MjMxfQ.gqA245tRiBQB9owKRWIpX1we1T362R-xDTt4YT9AhRY';

      return request({
        method: 'POST',
        url: `/posts/${postId}/votes`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json;charset=UTF-8',
        },
        data: {
          imageId,
        },
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['voteDetail', postId],
      });
    },

    onError: (err) => {
      console.error('투표 에러:', err);
    },
  });
}

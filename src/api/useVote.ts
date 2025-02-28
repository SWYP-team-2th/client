import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '@/api/config';

export default function useVote(postId: number) {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, number>({
    mutationFn: (imageId: number) => {
      return request({
        method: 'POST',
        url: `/posts/${postId}/votes`,
        headers: {
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

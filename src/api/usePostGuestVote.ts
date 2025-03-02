import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from '@/api/config';

export default function usePostGuestVote(
  postId: number,
  options?: UseMutationOptions<unknown, Error, number>,
) {
  return useMutation<unknown, Error, number>({
    mutationFn: (imageId: number) => {
      return request({
        method: 'POST',
        url: `/posts/${postId}/votes/guest`,
        headers: {
          'Guest-Token': localStorage.getItem('guestToken') ?? '',
        },
        data: {
          imageId,
        },
      });
    },
    onError: (err) => {
      console.error('투표 에러:', err);
    },
    ...options,
  });
}

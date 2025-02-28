import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from './config';

export default function usePostCloseVote(
  options?: UseMutationOptions<void, Error, number>,
) {
  return useMutation<void, Error, number>({
    mutationFn: (postId: number) =>
      request({
        method: 'POST',
        url: `/posts/${postId}/close`,
      }),
    ...options,
  });
}

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from '@/api/config';

export function useCancelVote(
  options?: UseMutationOptions<void, Error, number>,
) {
  return useMutation<void, Error, number>({
    mutationFn: (voteId: number) =>
      request({
        method: 'DELETE',
        url: `/votes/${voteId}`,
      }),
    ...options,
  });
}

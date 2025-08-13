import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from '@/api/config';

interface VoteRequest {
  postId: number;
  pollChoiceIds: number[];
}

export default function usePost(
  options?: UseMutationOptions<void, Error, VoteRequest>,
) {
  return useMutation<void, Error, VoteRequest>({
    mutationFn: (voteData: VoteRequest) => {
      return request({
        method: 'POST',
        url: '/votes',
        data: voteData,
      });
    },
    ...options,
  });
}

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
    onSuccess: () => {
      console.log('투표 성공');
    },
    onError: (err) => {
      console.error('투표 에러:', err);
    },
    ...options,
  });
}

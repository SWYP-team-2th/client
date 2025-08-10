import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from '@/api/config';

interface VoteRequest {
  postId: number;
  pollChoiceIds: number[];
}

interface VoteResponse {
  success: boolean;
  message?: string;
}

export default function usePost(
  options?: UseMutationOptions<VoteResponse, Error, VoteRequest>,
) {
  return useMutation<VoteResponse, Error, VoteRequest>({
    mutationFn: (voteData: VoteRequest) => {
      return request({
        method: 'POST',
        url: '/votes',
        data: voteData,
      });
    },
    onSuccess: (data) => {
      console.log('투표 성공:', data);
    },
    onError: (err) => {
      console.error('투표 에러:', err);
    },
    ...options,
  });
}

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from './config';
import { PollRegistData } from '@/components/vote-regist/Provider/types';

interface RegistVoteResponse {
  postId: number;
  shareUrl: string;
}

export default function usePostRegistVote(
  options?: Omit<
    UseMutationOptions<RegistVoteResponse, Error, PollRegistData>,
    'mutationFn'
  >,
) {
  return useMutation<RegistVoteResponse, Error, PollRegistData>({
    mutationFn: (data: PollRegistData) =>
      request({
        method: 'POST',
        url: '/posts',
        data,
      }),
    ...options,
  });
}

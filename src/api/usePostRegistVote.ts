import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from './config';
import { PollFormData } from '@/components/poll/Provider/types';

interface RegistVoteResponse {
  postId: number;
  shareUrl: string;
}

export default function usePostRegistVote(
  options?: Omit<
    UseMutationOptions<RegistVoteResponse, Error, PollFormData>,
    'mutationFn'
  >,
) {
  return useMutation<RegistVoteResponse, Error, PollFormData>({
    mutationFn: (data: PollFormData) =>
      request({
        method: 'POST',
        url: '/posts',
        data,
      }),
    ...options,
  });
}

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from './config';
import { PollFormData } from '@/components/poll/Provider/types';

interface RegistPollRequest extends Omit<PollFormData, 'pollChoices'> {
  pollChoices: {
    title: string;
    imageUrl: string;
  }[];
}

interface RegistVoteResponse {
  postId: number;
  shareUrl: string;
}

export default function usePostRegistVote(
  options?: Omit<
    UseMutationOptions<RegistVoteResponse, Error, RegistPollRequest>,
    'mutationFn'
  >,
) {
  return useMutation<RegistVoteResponse, Error, RegistPollRequest>({
    mutationFn: (data: RegistPollRequest) =>
      request({
        method: 'POST',
        url: '/posts',
        data,
      }),
    ...options,
  });
}

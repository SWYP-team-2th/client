import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from './config';
import { PollFormData } from '@/components/poll/Provider/types';

interface UpdatePollResponse {
  postId: number;
  shareUrl: string;
}

export default function useUpdatePoll({
  id,
  options,
}: {
  id: number;
  options?: Omit<
    UseMutationOptions<UpdatePollResponse, Error, PollFormData>,
    'mutationFn'
  >;
}) {
  return useMutation<UpdatePollResponse, Error, PollFormData>({
    mutationFn: (data: PollFormData) =>
      request({
        method: 'PUT',
        url: `/posts/${id}`,
        data,
      }),
    ...options,
  });
}

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from './config';
import { PollRegistData } from '@/components/vote-regist/Provider/types';

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
    UseMutationOptions<UpdatePollResponse, Error, PollRegistData>,
    'mutationFn'
  >;
}) {
  return useMutation<UpdatePollResponse, Error, PollRegistData>({
    mutationFn: (data: PollRegistData) =>
      request({
        method: 'PUT',
        url: `/posts/${id}`,
        data,
      }),
    ...options,
  });
}

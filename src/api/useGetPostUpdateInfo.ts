import { useQuery } from '@tanstack/react-query';
import { request } from './config';
import { PollFormData } from '@/components/poll/Provider/types';

export default function useGetPostUpdateInfo(postId: number) {
  return useQuery<PollFormData>({
    queryKey: ['posts', postId, 'update'],
    queryFn: () =>
      request<PollFormData>({
        method: 'GET',
        url: `/posts/${postId}/update`,
      }),
  });
}

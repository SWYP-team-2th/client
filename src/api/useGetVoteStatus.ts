import { useSuspenseQuery } from '@tanstack/react-query';
import { request } from '@/api/config';

export interface VoteStatusType {
  imageName: string;
  voteCount: number;
  voteRatio: string;
}

export default function useGetVoteStatus(postId: number) {
  return useSuspenseQuery<VoteStatusType[]>({
    queryKey: ['voteStatus', postId],
    queryFn: () =>
      request({
        method: 'GET',
        url: `/posts/${postId}/status`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
  });
}

import { useQuery } from '@tanstack/react-query';
import { request } from '@/api/config';

export interface VotesStatus {
  id: number;
  title: string;
  imageUrl: string;
  voteCount: number;
  voteRatio: string;
}

export const useGetVotesStatus = (postId: string) => {
  return useQuery({
    queryKey: ['postResult', postId],
    queryFn: () =>
      request<VotesStatus[]>({
        method: 'GET',
        url: `/posts/${postId}/votes/result`,
      }),
    enabled: !!postId,
  });
};

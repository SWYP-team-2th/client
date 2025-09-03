import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { request } from '@/api/config';

export interface VoteResult {
  id: number;
  title: string;
  imageUrl: string;
  voteCount: number;
  voteRatio: string;
}

interface GetVoteResultOptions {
  postId: string;
  options?: Omit<UseQueryOptions<VoteResult[]>, 'queryKey' | 'queryFn'>;
}

export const useGetVotesResult = ({
  postId,
  options,
}: GetVoteResultOptions) => {
  return useQuery({
    queryKey: ['postResult', postId],
    queryFn: () =>
      request<VoteResult[]>({
        method: 'GET',
        url: `/posts/${postId}/votes/result`,
      }),
    ...options,
  });
};

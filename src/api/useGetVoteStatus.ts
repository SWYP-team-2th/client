import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { request } from '@/api/config';
import { getAccessToken, getRole } from '@/components/login/Auth/token';

export interface VoteStatusType {
  id: number;
  imageName: string;
  voteCount: number;
  voteRatio: string;
}

export default function useGetVoteStatus(
  postId: number,
  options?: Omit<UseQueryOptions<VoteStatusType[]>, 'queryKey' | 'queryFn'>,
) {
  const accessToken = getAccessToken();
  return useQuery<VoteStatusType[]>({
    queryKey: ['voteStatus', postId],
    queryFn: () =>
      request({
        method: 'GET',
        url: `/posts/${postId}/status`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }),
    ...options,
    enabled:
      accessToken && getRole() === 'USER' ? options?.enabled !== false : false,
  });
}

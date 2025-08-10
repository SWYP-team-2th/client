import { useQuery } from '@tanstack/react-query';
import { request } from '@/api/config';

export interface GetResultItem {
  id: number;
  title: string;
  imageUrl: string;
  voteCount: number;
  voteRatio: string;
}

export const useGetResult = (postId: string) => {
  return useQuery({
    queryKey: ['postResult', postId],
    queryFn: () =>
      request<GetResultItem[]>({
        method: 'GET',
        url: `/posts/${postId}/votes/status`,
      }),
    enabled: !!postId,
  });
};

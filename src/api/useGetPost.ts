import { useQuery } from '@tanstack/react-query';
import type { Post } from '@/types/post';
import { request } from '@/api/config';

interface UseGetPostParams {
  postId: string;
  shareKey?: string;
}

export const useGetPost = ({ postId, shareKey }: UseGetPostParams) => {
  return useQuery({
    queryKey: ['post', postId, shareKey],
    queryFn: () =>
      request<Post>({
        method: 'GET',
        url: `/posts/${postId}`,
        params: { shareKey },
      }),
    enabled: !!postId,
  });
};

import { useQuery } from '@tanstack/react-query';
import type { Post } from '@/types/post';
import { request } from '@/api/config';

export const useGetPost = (postId: string) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () =>
      request<Post>({
        method: 'GET',
        url: `/posts/${postId}`,
      }),
    enabled: !!postId,
  });
};

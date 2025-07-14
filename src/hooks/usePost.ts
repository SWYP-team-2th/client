import { useQuery } from '@tanstack/react-query';
import type { Post } from '@/types/post';

const fetchPost = async (postId: string): Promise<Post> => {
  const response = await fetch(`/posts/${postId}`);
  if (!response.ok) {
    throw new Error('게시글을 불러오는데 실패했습니다.');
  }
  return response.json();
};

export const usePost = (postId: string) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
    enabled: !!postId,
  });
};

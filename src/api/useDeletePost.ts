import { useMutation } from '@tanstack/react-query';
import { request } from '@/api/config';

const deletePostRequest = (postId: number): Promise<void> => {
  return request({
    method: 'DELETE',
    url: `/posts/${postId}`,
  });
};

export function useDeletePost() {
  return useMutation({
    mutationFn: (postId: number) => deletePostRequest(postId),
  });
}

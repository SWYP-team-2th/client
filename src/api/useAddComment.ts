import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { request } from '@/api/config';

interface AddCommentVariables {
  postId: number;
  content: string;
}

interface AddCommentResponse {
  commentId: number;
}

<<<<<<< HEAD
export default function useAddComment(
  options?: UseMutationOptions<AddCommentResponse, Error, AddCommentVariables>,
) {
  return useMutation({
    mutationFn: ({ postId, content }: AddCommentVariables) =>
      request<AddCommentResponse>({
=======
interface AddCommentOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

export default function useAddComment(options?: AddCommentOptions) {
  const queryClient = useQueryClient();

  return useMutation<AddCommentResponse, Error, AddCommentVariables>({
    mutationFn: ({ postId, content }) => {
      return request({
>>>>>>> 787dd74 (댓글 추가 API 훅에 성공 및 오류 콜백 옵션 추가, CommentBottomSheet에서 해당 옵션 사용)
        method: 'POST',
        url: `/posts/${postId}/comments`,
        data: { content },
      }),

<<<<<<< HEAD
    ...options,
=======
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      options?.onSuccess?.();
    },

    onError: (error) => {
      console.error('댓글 작성 에러:', error);
      options?.onError?.();
    },
>>>>>>> 787dd74 (댓글 추가 API 훅에 성공 및 오류 콜백 옵션 추가, CommentBottomSheet에서 해당 옵션 사용)
  });
}

import { useQueryClient } from '@tanstack/react-query';
import { useDeleteComment } from '@/api/useDeleteComment';
import { useDialog } from '@/components/common/Dialog/hooks';

export default function useDeleteCommentDialog() {
  const { closeDialog } = useDialog();
  const queryClient = useQueryClient();

  const { mutate: deleteComment, isPending: isDeleteCommentPending } =
    useDeleteComment({
      onSuccess: (_, { postId }) => {
        queryClient.invalidateQueries({
          queryKey: ['comments', postId],
          exact: false,
        });
        closeDialog();
      },
    });

  return {
    deleteComment,
    isDeleteCommentPending,
  };
}

import { useDeleteComment } from '@/api/useDeleteComment';
import { useDialog } from '@/components/common/Dialog/hooks';

export default function useDeleteCommentDialog() {
  const { closeDialog } = useDialog();

  const { mutate: deleteComment, isPending: isDeleteCommentPending } =
    useDeleteComment({
      onSuccess: () => {
        closeDialog();
      },
    });

  return {
    deleteComment,
    isDeleteCommentPending,
  };
}

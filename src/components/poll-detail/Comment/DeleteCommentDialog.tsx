import { useQueryClient } from '@tanstack/react-query';
import { useDeleteComment } from '@/api/useDeleteComment';
import Dialog from '@/components/common/Dialog';
import { useDialog } from '@/components/common/Dialog/hooks';
import useToast from '@/components/common/Toast/hooks';

interface DeleteCommentDialogProps {
  postId: number;
  commentId: number;
}

export default function DeleteCommentDialog({
  postId,
  commentId,
}: DeleteCommentDialogProps) {
  const queryClient = useQueryClient();
  const { closeDialog } = useDialog();
  const { success: showSuccessToast, error: showErrorToast } = useToast();

  const { mutate: deleteComment, isPending: isPending } = useDeleteComment({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['post', postId.toString()] });
      showSuccessToast({
        title: '댓글이 삭제되었습니다.',
      });
      closeDialog();
    },
    onError: () => {
      showErrorToast({
        title: '댓글 삭제 실패',
        description: '댓글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.',
      });
    },
  });

  const handleDelete = () => {
    deleteComment({ postId, commentId });
  };

  return (
    <Dialog
      title="댓글을 삭제할까요?"
      cancelButtonProps={{
        text: '취소',
        isLoading: isPending,
      }}
      confirmButtonProps={{
        text: '확인',
        onClick: handleDelete,
        isLoading: isPending,
      }}
      showLaterButton={false}
    />
  );
}

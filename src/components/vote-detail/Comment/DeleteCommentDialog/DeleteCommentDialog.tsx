import useDeleteCommentDialog from './hooks';
import Dialog from '@/components/common/Dialog';

interface DeleteConfirmDialogProps {
  postId: number;
  commentId: number;
}

export default function DeleteCommentDialog({
  postId,
  commentId,
}: DeleteConfirmDialogProps) {
  const { deleteComment, isDeleteCommentPending } = useDeleteCommentDialog();

  return (
    <Dialog
      title="정말 댓글을 삭제하실 건가요?"
      cancelButtonProps={{
        text: '취소',
        isLoading: isDeleteCommentPending,
      }}
      confirmButtonProps={{
        text: '삭제',
        onClick: () => {
          deleteComment({ postId, commentId });
        },
        isLoading: isDeleteCommentPending,
      }}
      showLaterButton={false}
    />
  );
}

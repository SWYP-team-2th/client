import useDeleteConfirmDialog from './hooks';
import Dialog from '@/components/common/Dialog';

interface DeleteConfirmDialogProps {
  postId: number;
}

export default function DeleteConfirmDialog({
  postId,
}: DeleteConfirmDialogProps) {
  const { deletePost, isDeletePostPending } = useDeleteConfirmDialog();

  return (
    <Dialog
      title="이 투표를 삭제하시겠습니까?"
      description="삭제하면 해당 투표와 댓글이 모두 사라지며 복구할 수 없습니다."
      cancelButtonProps={{
        text: '취소',
        isLoading: isDeletePostPending,
      }}
      confirmButtonProps={{
        text: '삭제',
        onClick: () => {
          deletePost(Number(postId));
        },
        isLoading: isDeletePostPending,
      }}
      showLaterButton={false}
    />
  );
}

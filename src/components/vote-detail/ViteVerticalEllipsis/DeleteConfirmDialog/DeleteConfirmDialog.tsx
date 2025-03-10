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
      title="이 투표를 정말 무효처리 하시겠어요? 😢"
      description="삭제하면 다시 되돌릴 수 없어요!"
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

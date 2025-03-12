import useCloseConfirmDialog from './hooks';
import Dialog from '@/components/common/Dialog';

interface CloseConfirmDialogProps {
  postId: number;
  description?: string;
}

export default function CloseConfirmDialog({
  postId,
  description,
}: CloseConfirmDialogProps) {
  const { handleCloseVote, isCloseVotePending } = useCloseConfirmDialog({
    postId,
  });

  return (
    <Dialog
      title="투표를 마감 하시겠습니까?"
      description={description}
      cancelButtonProps={{
        text: '취소',
        isLoading: isCloseVotePending,
      }}
      confirmButtonProps={{
        text: '마감',
        onClick: () => {
          handleCloseVote(postId);
        },
        isLoading: isCloseVotePending,
      }}
      showLaterButton={false}
    />
  );
}

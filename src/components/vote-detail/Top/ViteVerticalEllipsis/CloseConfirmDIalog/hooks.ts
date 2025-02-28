import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import usePostCloseVote from '@/api/usePostCloseVote';
import { useDialog } from '@/components/common/Dialog/hooks';

interface UseCloseConfirmDialogOptions {
  postId: number;
}

export default function useCloseConfirmDialog({
  postId,
}: UseCloseConfirmDialogOptions) {
  const { shareUrl } = useParams<{ shareUrl: string }>();
  const { closeDialog } = useDialog();
  const queryClient = useQueryClient();
  const { mutate: closeVote, isPending: isCloseVotePending } = usePostCloseVote(
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['voteDetail', shareUrl],
        });
        queryClient.invalidateQueries({
          queryKey: ['voteStatus', postId],
        });
        closeDialog();
      },
    },
  );

  const handleCloseVote = (postId: number) => {
    closeVote(postId);
  };

  return {
    handleCloseVote,
    isCloseVotePending,
  };
}

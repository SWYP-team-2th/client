import { useQueryClient } from '@tanstack/react-query';
import usePostCloseVote from '@/api/usePostCloseVote';
import { useDialog } from '@/components/common/Dialog/hooks';

interface UseCloseConfirmDialogOptions {
  postId: number;
}

export default function useCloseConfirmDialog({
  postId,
}: UseCloseConfirmDialogOptions) {
  const { closeDialog } = useDialog();
  const queryClient = useQueryClient();
  const { mutate: closeVote, isPending: isCloseVotePending } = usePostCloseVote(
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['voteDetail', postId],
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

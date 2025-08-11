import { useQueryClient } from '@tanstack/react-query';
import usePost from '@/api/usePost';
import { Button } from '@/components/common/Button/Button';
import { useSelection } from '@/components/poll-detail/SelectionContext';

interface PollButtonProps {
  postId: number;
  onVoted: () => void;
}

export default function PollButton({ postId, onVoted }: PollButtonProps) {
  const { selectedChoiceIds } = useSelection();
  const queryClient = useQueryClient();
  const { mutate: vote, isPending } = usePost({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', String(postId)] });
      queryClient.invalidateQueries({
        queryKey: ['postResult', String(postId)],
      });
      onVoted();
    },
  });

  const handleVote = () => {
    vote({
      postId,
      pollChoiceIds: selectedChoiceIds,
    });
  };

  return (
    <Button
      variant="solid"
      buttonType={
        isPending || selectedChoiceIds.length === 0 ? 'disabled' : 'primary'
      }
      size="large"
      onClick={handleVote}
      disabled={isPending || selectedChoiceIds.length === 0}
    >
      {isPending ? '투표 중...' : '투표하기'}
    </Button>
  );
}

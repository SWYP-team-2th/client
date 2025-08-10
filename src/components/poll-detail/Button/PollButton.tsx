import usePost from '@/api/usePost';
import { Button } from '@/components/common/Button/Button';
import { useSelection } from '@/components/poll-detail/SelectionContext';

interface PollButtonProps {
  postId: number;
}

export default function PollButton({ postId }: PollButtonProps) {
  const { selectedChoiceIds } = useSelection();
  const { mutate: vote, isPending } = usePost();

  const handleVote = () => {
    if (selectedChoiceIds.length === 0) {
      alert('투표할 선택지를 선택해주세요.');
      return;
    }

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

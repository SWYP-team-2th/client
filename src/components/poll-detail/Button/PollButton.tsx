import { useQueryClient } from '@tanstack/react-query';
import usePost from '@/api/usePost';
import { Button } from '@/components/common/Button/Button';
import useToast from '@/components/common/Toast/hooks';
import { useSelection } from '@/components/poll-detail/SelectionContext';

interface PollButtonProps {
  postId: number;
  onVoted: () => void;
  checkedItems: number[];
}

export default function PollButton({
  postId,
  onVoted,
  checkedItems,
}: PollButtonProps) {
  const { setVoteMode } = useSelection();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate: vote, isPending } = usePost({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', String(postId)] });
      queryClient.invalidateQueries({
        queryKey: ['postResult', String(postId)],
      });

      toast.success({
        title: '투표 완료',
        description: '투표가 성공적으로 완료되었어요.',
      });

      // voteMode 종료
      setVoteMode(false);
      onVoted();
    },
    onError: () => {
      toast.error({
        title: '투표 실패',
        description: '투표 처리 중 오류가 발생했어요. 다시 시도해주세요.',
      });
    },
  });

  const handleVote = () => {
    vote({
      postId,
      pollChoiceIds: checkedItems,
    });
  };

  return (
    <Button
      variant="solid"
      buttonType={
        isPending || checkedItems.length === 0 ? 'disabled' : 'primary'
      }
      size="large"
      onClick={handleVote}
      disabled={isPending || checkedItems.length === 0}
    >
      {isPending ? '투표 중...' : '투표하기'}
    </Button>
  );
}

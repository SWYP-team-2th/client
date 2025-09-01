import PollButton from './PollButton';
import ShareButton from './ShareButton';
import { Button } from '@/components/common/Button/Button';
import { useSelection } from '@/components/poll-detail/SelectionContext';
import usePost from '@/api/usePost';
import { useQueryClient } from '@tanstack/react-query';

interface PollActionButtonsProps {
  shareUrl: string;
  postId: number;
  isVoted: boolean;
}

export default function PollActionButtons({
  shareUrl,
  postId,
  isVoted,
}: PollActionButtonsProps) {
  const { checkedItems, setChecked } = useSelection();
  const queryClient = useQueryClient();

  const { mutate: vote } = usePost({
    onSuccess: () => {
      // 투표 취소/다시하기 후 데이터 새로고침
      queryClient.invalidateQueries({ queryKey: ['post', String(postId)] });
      queryClient.invalidateQueries({
        queryKey: ['postResult', String(postId)],
      });
    },
    onError: () => {
      console.error('투표 취소/다시하기 실패염');
    },
  });

  const onVoted = () => {
    // 투표 완료 후 서버 데이터 새로고침
    queryClient.invalidateQueries({ queryKey: ['post', String(postId)] });
    queryClient.invalidateQueries({ queryKey: ['postResult', String(postId)] });
  };

  const handleVoteAgain = () => {
    // 투표 취소 API 호출
    vote({
      postId,
      pollChoiceIds: [],
    });
  };

  const handleVoteCancel = () => {
    // 투표 취소 API 호출
    vote({
      postId,
      pollChoiceIds: [],
    });

    // 모든 체크박스 해제
    checkedItems.forEach((id) => {
      setChecked(id, false);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-[18px] my-5">
      {!isVoted ? (
        <PollButton
          postId={postId}
          onVoted={onVoted}
          checkedItems={checkedItems}
        />
      ) : (
        <>
          <Button
            variant="solid"
            size="large"
            buttonType="primary"
            onClick={handleVoteAgain}
          >
            투표 다시하기
          </Button>
          <Button
            variant="outline"
            size="large"
            buttonType="primary"
            onClick={handleVoteCancel}
          >
            투표 취소하기
          </Button>
        </>
      )}
      <ShareButton shareUrl={shareUrl} />
    </div>
  );
}

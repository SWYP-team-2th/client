import { useQueryClient } from '@tanstack/react-query';
import PollButton from './PollButton';
import ShareButton from './ShareButton';
import usePost from '@/api/usePost';
import { Button } from '@/components/common/Button/Button';
import useToast from '@/components/common/Toast/hooks';
import { useSelection } from '@/components/poll-detail/SelectionContext';

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
  const { checkedItems, setChecked, voteMode, setVoteMode } = useSelection();
  const queryClient = useQueryClient();
  const { error: showErrorToast } = useToast();

  const { mutate: vote } = usePost({
    onSuccess: () => {
      // 투표 취소/다시하기 후 데이터 새로고침
      queryClient.invalidateQueries({ queryKey: ['post', String(postId)] });
      queryClient.invalidateQueries({
        queryKey: ['postResult', String(postId)],
      });
    },
    onError: () => {
      showErrorToast({
        title: '투표 실패',
        description: '오류가 발생하였습니다. 다시 시도해주세요.',
      });
    },
  });

  const onVoted = () => {
    // 투표 완료 후 서버 데이터 새로고침
    queryClient.invalidateQueries({ queryKey: ['post', String(postId)] });
    queryClient.invalidateQueries({ queryKey: ['postResult', String(postId)] });
  };

  // 투표 다시하기 (수정하기)
  const handleVoteAgain = () => {
    // 기존 선택 값 유지해야하기 때문에 voteMode만 켜주면 됨
    setVoteMode(true);
  };

  // 투표 취소하기 (초기화)
  const handleVoteCancel = () => {
    // 서버에 배열 초기화하여 요청
    vote({
      postId,
      pollChoiceIds: [],
    });

    // 모든 체크박스 해제
    checkedItems.forEach((id) => {
      setChecked(id, false);
    });

    // voteMode도 끄기
    setVoteMode(false);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-[18px] my-5">
      {!isVoted || voteMode ? (
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

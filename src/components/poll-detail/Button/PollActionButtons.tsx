import PollButton from './PollButton';
import ShareButton from './ShareButton';
import { Button } from '@/components/common/Button/Button';
import { useSelection } from '@/components/poll-detail/SelectionContext';

interface PollActionButtonsProps {
  shareUrl: string;
  postId: number;
  isVoted: boolean;
  setIsVoted: (v: boolean) => void;
}

export default function PollActionButtons({
  shareUrl,
  postId,
  isVoted,
  setIsVoted,
}: PollActionButtonsProps) {
  const { selectedChoiceIds, setChecked } = useSelection();

  const onVoted = () => setIsVoted(true);

  const handleVoteAgain = () => {
    setIsVoted(false);
  };

  const handleCancel = () => {
    selectedChoiceIds.forEach((id) => setChecked(String(id), false));
    setIsVoted(false);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-[18px] my-5">
      {!isVoted ? (
        <PollButton postId={postId} onVoted={onVoted} />
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
            onClick={handleCancel}
          >
            투표 취소하기
          </Button>
        </>
      )}
      <ShareButton shareUrl={shareUrl} />
    </div>
  );
}

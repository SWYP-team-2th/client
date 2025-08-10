import PollButton from './PollButton';
import ShareButton from './ShareButton';

interface PollActionButtonsProps {
  shareUrl: string;
  postId: number;
}

export default function PollActionButtons({
  shareUrl,
  postId,
}: PollActionButtonsProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-[18px] my-5">
      <PollButton postId={postId} />
      <ShareButton shareUrl={shareUrl} />
    </div>
  );
}

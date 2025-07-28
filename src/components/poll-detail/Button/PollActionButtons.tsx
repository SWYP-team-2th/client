import PollButton from './PollButton';
import ShareButton from './ShareButton';

interface PollActionButtonsProps {
  shareUrl: string;
}

export default function PollActionButtons({
  shareUrl,
}: PollActionButtonsProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-[18px] my-5">
      <PollButton />
      <ShareButton shareUrl={shareUrl} />
    </div>
  );
}

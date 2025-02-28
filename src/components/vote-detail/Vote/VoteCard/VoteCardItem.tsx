import { HTMLAttributes } from 'react';
import Icon from '@/components/common/Icon';
import { Label } from '@/components/common/Label/Label';
import { cn } from '@/utils/cn';

interface VoteCardItemProps extends HTMLAttributes<HTMLButtonElement> {
  image: {
    id: number;
    imageName: string;
    imageUrl: string;
    thumbnailUrl: string;
    voted: boolean;
  };
  handleVote: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function VoteCardItem({
  image,
  onClick,
  handleVote,
}: VoteCardItemProps) {
  return (
    <button
      className={cn(
        'relative w-full rounded-2xl overflow-hidden',
        image.voted
          ? 'bg-gray-100 shadow-[0_0_0_3px_#FFFFFF,0_0_0_6px_#FFB300]'
          : 'bg-gray-100',
      )}
      onClick={onClick}
    >
      <div className="relative w-full aspect-[7/9] rounded-xl overflow-hidden bg-gray-100">
        <img src={image.thumbnailUrl} className="w-full h-full object-cover" />
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-gray-900/40 px-3 py-2 flex justify-between items-center">
        <span className="text-white font-semibold">{image.imageName}</span>

        <button onClick={handleVote} className="focus:outline-none">
          <Icon
            name={image.voted ? 'HeartFillRed' : 'HeartOutlineWhite'}
            size="medium"
            className={cn(
              'cursor-pointer',
              image.voted ? 'text-primary-500' : 'text-white',
            )}
          />
        </button>
      </div>

      {image.voted && (
        <div className="flex absolute top-2 left-2 space-x-2">
          <Label size="small" variant="primary">
            뽀또픽!
          </Label>
        </div>
      )}
    </button>
  );
}

import { HTMLAttributes } from 'react';
import { useGetImageStatus } from './hooks';
import Icon from '@/components/common/Icon';
import AnimatedLabel from '@/components/common/Label/AnimatedLabel';
import { Label } from '@/components/common/Label/Label';
import { cn } from '@/utils/cn';

interface VoteCardItemProps extends HTMLAttributes<HTMLButtonElement> {
  image: {
    id: number;
    imageName: string;
    imageUrl: string;
    thumbnailUrl: string;
    voteId: number | null;
  };
  handleVote: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function VoteCardItem({
  image,
  onClick,
  handleVote,
}: VoteCardItemProps) {
  const { id, status } = useGetImageStatus();

  return (
    <button
      className={cn(
        'relative w-full rounded-2xl overflow-hidden bg-gray-100',
        image.id === id &&
          status === 'VOTED' &&
          'bg-gray-100 shadow-[0_0_0_3px_#FFFFFF,0_0_0_6px_#FFB300]',
        image.id === id &&
          status === 'WIN' &&
          'bg-gray-100 shadow-[0_0_0_3px_#FFFFFF,0_0_0_6px_#853AFF]',
      )}
      onClick={onClick}
    >
      <div className="relative w-full aspect-[206/272] rounded-xl overflow-hidden bg-gray-100">
        <img src={image.thumbnailUrl} className="w-full h-full object-cover" />
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-gray-900/40 px-[14px] py-2 flex justify-between items-center">
        <span className="text-gray-100 text-body-2-normal">
          {image.imageName}
        </span>

        <button onClick={handleVote} className="focus:outline-none">
          <Icon
            name={image.voteId ? 'HeartFillRed' : 'HeartOutlineWhite'}
            size="small"
            className={cn(
              'cursor-pointer',
              image.voteId ? 'text-primary-500' : 'text-gray-100',
            )}
          />
        </button>
      </div>
      {image.id === id && image.voteId && (
        <div className="flex absolute top-[6px] left-[6px] space-x-2">
          <Label color="isPicked" variant="solid">
            뽀또픽!
          </Label>
        </div>
      )}
      {image.id === id && !image.voteId && status === 'WIN' && (
        <div className="flex absolute top-2 left-2 space-x-2">
          <AnimatedLabel color="accent">
            <Icon name="MedalWhite" size="small" />
            <p className="pl-[3px]">베스트픽!</p>
          </AnimatedLabel>
        </div>
      )}
      {image.id === id && image.voteId && status === 'WIN' && (
        <div>
          <div className="flex absolute top-2 left-2 space-x-2">
            <AnimatedLabel color="accent">
              <Icon name="MedalWhite" size="small" />
              <p className="pl-[3px]">베스트픽!</p>
            </AnimatedLabel>
          </div>
          <div className="flex absolute top-8 left-2 space-x-2">
            <Label color="isPicked" variant="solid">
              뽀또픽!
            </Label>
          </div>
        </div>
      )}
    </button>
  );
}

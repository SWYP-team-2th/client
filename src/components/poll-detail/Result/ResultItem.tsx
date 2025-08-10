import { cn } from '@/utils/cn';

interface ResultItemProps {
  rank: number;
  title: string;
  imageUrl: string;
  voteCount: number;
  percentage: number;
  className?: string;
}

export default function ResultItem({
  rank,
  title,
  imageUrl,
  voteCount,
  percentage,
  className,
}: ResultItemProps) {
  const clamped = Math.min(100, Math.max(0, percentage));
  const naturalPercentage = Math.floor(clamped);

  return (
    <div className={cn('flex items-center w-full', className)}>
      <span className="text-center text-label-1">{rank}</span>

      <div className="w-[58px] h-[58px] rounded-md overflow-hidden flex-shrink-0 ml-4 mr-3">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-label-1 text-gray-900">{title}</span>
          <div className="flex items-center gap-[2px]">
            <span className="text-label-2 text-primary-800">{voteCount}표</span>
            <span className="text-body-2-long text-gray-700">
              ({naturalPercentage}%)
            </span>
          </div>
        </div>
        <div className="mt-2 h-2 w-full rounded-[99px] bg-gray-300 overflow-hidden">
          <div
            className={cn('h-full rounded-[99px] transition-all')}
            style={{
              width: `${clamped}%`,
              background:
                'linear-gradient(90deg, var(--color-Primary-700, #493AC5) 0%, var(--color-Primary-500, #6351FE) 100%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

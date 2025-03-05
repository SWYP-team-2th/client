import { VoteStatusType } from '@/api/useGetVoteStatus';

interface VoteResultItemProps {
  status: VoteStatusType;
  isHighest: boolean;
}

export default function VoteResultItem({
  status,
  isHighest,
}: VoteResultItemProps) {
  const voteRatio = parseFloat(status.voteRatio);

  return (
    <div className="flex items-center mb-[6px]">
      <div className="flex">
        <span className="text-label-small">{status.imageName}</span>
      </div>
      <div className="ml-[9px] flex flex-1">
        <div
          className={`h-[13px] ${isHighest ? 'bg-primary-500' : 'bg-primary-300'} rounded-tr-[99px] rounded-br-[99px]`}
          style={{ width: `${voteRatio}%` }}
        />
      </div>
      <div className="ml-[13px] flex">
        <span className="text-gray-800 text-label-small">{`${status.voteCount}표`}</span>
        <span className="pl-[2px] text-gray-800 text-label-x-small-2">{`(${voteRatio}%)`}</span>
      </div>
    </div>
  );
}

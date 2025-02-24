import { useShareUrl } from '@/components/vote-detail/ShareUrlProvider';
import useVoteDetail from '@/components/vote-detail/Top/VoteAuthorInfo/hooks';

export default function VoteResultItem() {
  const shareUrl = useShareUrl();
  const { voteDetail } = useVoteDetail(shareUrl);

  return (
    <>
      {voteDetail.votes.map((vote) => (
        <div key={vote.id} className="flex items-center mb-sm">
          <div>
            <span className="pl-[1px] text-label-medium">
              {vote.id === 1 ? '뽀또A' : '뽀또B'}
            </span>
          </div>
          <div className="ml-[9px] flex flex-1">
            <div
              className={`w-full h-[13px] ${
                vote.voted ? 'bg-primary-500' : 'bg-primary-300'
              } rounded-tr-[99px] rounded-br-[99px]`}
              style={{ width: `${vote.voteRatio}%` }}
            />
          </div>
          <div className="ml-[13px]">{`${vote.voteRatio}%`}</div>
        </div>
      ))}
    </>
  );
}

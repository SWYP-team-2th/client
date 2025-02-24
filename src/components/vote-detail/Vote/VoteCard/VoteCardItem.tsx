import { Label } from '@/components/common/Label/Label';
import { useShareUrl } from '@/components/vote-detail/ShareUrlProvider';
import useVoteDetail from '@/components/vote-detail/Top/VoteAuthorInfo/hooks';

export default function VoteCardItem() {
  const shareUrl = useShareUrl();
  const { voteDetail } = useVoteDetail(shareUrl);

  return (
    <>
      {voteDetail.votes.map((vote) => (
        <div
          key={vote.id}
          className={`relative w-full rounded-2xl overflow-hidden ${
            vote.voted ? 'border-4 border-primary-500' : 'bg-gray-100'
          }`}
        >
          <div className="relative w-full aspect-[7/9] rounded-xl overflow-hidden bg-gray-100">
            <img src={vote.imageUrl} className="w-full h-full object-cover" />
          </div>

          <div className="absolute top-2 left-2 flex space-x-2">
            {vote.voted && (
              <Label size="small" variant="primary">
                뽀또픽!
              </Label>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

import { useParams } from 'react-router-dom';
import VoteVerticalEllipsis from '@/components/vote-detail/Top/ViteVerticalEllipsis';
import useVoteDetail from '@/components/vote-detail/Top/VoteAuthorInfo/hooks';

export default function VoteAuthorInfo() {
  const { shareUrl } = useParams<{ shareUrl: string }>();
  const { voteDetail } = useVoteDetail(shareUrl ?? '');

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center mb-1">
          <img
            src={voteDetail.author.profileUrl}
            className="w-8 h-8 rounded-full mr-[8px]"
          />
          <span className="text-title-small-1">
            {voteDetail.author.nickname}
          </span>
        </div>

        {voteDetail.isAuthor && <VoteVerticalEllipsis />}
      </div>

      <p className="pl-[6px] text-body-2-long">{voteDetail.description}</p>
    </div>
  );
}

import User2Outline from '@/assets/icons/user2_outline_24px.svg?react';
import { useShareUrl } from '@/components/vote-detail/ShareUrlProvider';
import VoteVerticalEllipsis from '@/components/vote-detail/Top/ViteVerticalEllipsis';
import useVoteDetail from '@/components/vote-detail/Top/VoteAuthorInfo/hooks';

export default function VoteAuthorInfo() {
  const shareUrl = useShareUrl();
  const { voteDetail } = useVoteDetail(shareUrl);

  return (
    <div className="flex justify-between">
      <div className="pl-[5px]">
        <section className="flex items-center mb-[12px]">
          <div className="mr-[5px]">
            <User2Outline />
          </div>
          <span className="text-h3">{voteDetail.author.nickname}</span>
        </section>

        <section>
          <p>{voteDetail.description}</p>
        </section>
      </div>
      <VoteVerticalEllipsis />
    </div>
  );
}

import User2Outline from '@/assets/icons/user2_outline_24px.svg?react';
import VoteVerticalEllipsis from '@/components/vote-detail/Top/VoteVerticalEllipsis';

export default function VoteAuthorInfo() {
  return (
    <div className="flex justify-between">
      <div className="pl-[5px]">
        <section className="flex items-center mb-[12px]">
          <div className="mr-[5px]">
            <User2Outline />
          </div>
          <span className="text-h3">닉네임</span>
        </section>

        <section>
          <p>
            투표 설명 글은 최대 100자 뭐시기 투표 설명 글은 최대 100자
            뭐시기투표 설명 글은 최대 100자 뭐시기투표 설명 글은 최대 100자
            뭐시기투표 설명 글은 최대 100자 뭐시기
          </p>
        </section>
      </div>
      <VoteVerticalEllipsis />
    </div>
  );
}

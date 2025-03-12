import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Label } from '@/components/common/Label/Label';
import useVoteDetail from '@/components/vote-detail/Top/VoteAuthorInfo/hooks';
import VoteVerticalEllipsis from '@/components/vote-detail/ViteVerticalEllipsis';
import useNavigateToProfile from '@/hooks/useNicknameNavigation';

export default function VoteAuthorInfo() {
  const { shareUrl } = useParams<{ shareUrl: string }>();
  const { voteDetail } = useVoteDetail(shareUrl ?? '');
  const [isFullTextShown, setIsFullTextShown] = useState(false);
  const navigate = useNavigateToProfile(); // ✅ 훅 실행하여 함수 가져오기

  const maxLength = 40;
  const overComment = voteDetail.description.length > maxLength;

  const statusLabel =
    voteDetail.status === 'PROGRESS' ? '진행 중' : '투표 종료';
  const statusColor =
    voteDetail.status === 'PROGRESS' ? 'isProgress' : 'voteEnded';

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div
          className="flex items-center mb-1"
          onClick={() => navigate(voteDetail.author.id)}
        >
          <img
            src={voteDetail.author.profileUrl}
            className="w-8 h-8 rounded-full mr-[8px]"
          />
          <span className="text-title-small-1">
            {voteDetail.author.nickname}
          </span>

          <div className="ml-1">
            <Label variant="outline" color={statusColor}>
              {statusLabel}
            </Label>
          </div>
        </div>

        {voteDetail.isAuthor && <VoteVerticalEllipsis />}
      </div>

      <p className="pl-[6px] text-body-2-long">
        {!isFullTextShown
          ? voteDetail.description.slice(0, maxLength)
          : voteDetail.description}
        {!isFullTextShown && overComment && (
          <button
            onClick={() => setIsFullTextShown(true)}
            className="text-accent-700 ml-1"
          >
            ...더보기
          </button>
        )}
      </p>
    </div>
  );
}

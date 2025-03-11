import { useState } from 'react';
import { Label } from '@/components/common/Label/Label';
import VoteVerticalEllipsis from '@/components/vote-detail/ViteVerticalEllipsis';

interface HomeInfoType {
  nickname: string;
  profileUrl: string;
  status: 'PROGRESS' | 'CLOSED';
  description: string;
  isAuthor: boolean;
  shareUrl: string;
}

export default function HomeInfo({
  nickname,
  profileUrl,
  status,
  description,
  isAuthor,
  shareUrl,
}: HomeInfoType) {
  const [isFullTextShown, setIsFullTextShown] = useState(false);
  const maxLength = 40;
  const overComment = description.length > maxLength;

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-2">
        <div>
          <img
            src={profileUrl}
            alt="유저 이미지"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-title-small-1 mr-1">{nickname}</span>
          <Label
            variant="outline"
            color={status === 'PROGRESS' ? 'isProgress' : 'voteEnded'}
          >
            {status === 'PROGRESS' ? '진행중' : '투표 종료'}
          </Label>
        </div>
        <div>{isAuthor && <VoteVerticalEllipsis />}</div>
      </div>

      <div className="text-sm text-gray-700 pb-2">
        <p className="inline">
          {!isFullTextShown ? description.slice(0, maxLength) : description}
          {!isFullTextShown && overComment && (
            <button
              onClick={() => setIsFullTextShown(true)}
              className="text-accent-700"
            >
              ...더보기
            </button>
          )}
        </p>
      </div>
    </div>
  );
}

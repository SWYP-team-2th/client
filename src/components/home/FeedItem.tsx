import Icon from '@/components/common/Icon';
import { Label } from '@/components/common/Label/Label';
import { useTimeAgo } from '@/hooks/useTimeAgo';

interface FeedItemProps {
  id: number;
  author: {
    id: number;
    nickname: string;
    profileUrl: string;
  };
  status: 'PROGRESS' | 'CLOSED';
  title: string;
  thumbnailUrl: string;
  voterCount: number;
  commentCount: number;
  createdAt: string;
}

export default function FeedItem({
  author,
  status,
  title,
  thumbnailUrl,
  voterCount,
  commentCount,
  createdAt,
}: FeedItemProps) {
  const getStatusBadge = () => {
    return (
      <div className="absolute top-2.5 right-2.5">
        <Label
          variant="solid"
          colorVarient={status === 'PROGRESS' ? 'progress' : 'ended'}
          size="small"
        >
          {status === 'PROGRESS' ? '진행중' : '투표종료'}
        </Label>
      </div>
    );
  };

  const timeAgo = useTimeAgo(createdAt);

  return (
    <div className="bg-gray-100">
      <div className="flex items-start pt-4">
        <div className="flex-1 min-w-0">
          {/* 게시글 올린 유저 정보 */}
          <div className="flex items-center mb-2">
            <img
              src={author.profileUrl}
              alt="프로필"
              className="w-7 h-7 mr-[6px] rounded-full"
            />
            <span className="text-label-1 mr-1 text-gray-900">
              {author.nickname}
            </span>
            <span className="text-caption-1 text-gray-600">{timeAgo}</span>
          </div>

          {/* 게시글 내용 */}
          <p className="text-body-1-long text-gray-800 mb-[6px]">{title}</p>

          {/* 투표, 댓글 수 */}
          <div className="flex items-center text-body-2-long text-gray-600">
            <div className="flex items-center">
              <Icon name="DeadLineDarkGray" size="small" />
              <span>{voterCount}</span>
            </div>
            <span className="px-[6px]">·</span>
            <div className="flex items-center">
              <Icon name="MessageOutlineDarkGray" size="small" />
              <span>{commentCount}</span>
            </div>
          </div>
        </div>

        {/* 썸네일 */}
        <div className="flex-shrink-0 relative w-[108px] h-[108px]">
          <img
            src={thumbnailUrl}
            alt="썸네일 이미지"
            className="w-full h-full rounded-lg object-cover"
          />
          {getStatusBadge()}
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <div className="w-full h-px bg-gray-200"></div>
      </div>
    </div>
  );
}

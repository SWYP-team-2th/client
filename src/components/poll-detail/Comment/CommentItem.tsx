import Icon from '@/components/common/Icon';
import { CommentType } from '@/types/comment';
import { getRemainedTimeText } from '@/utils/date/date';

interface CommentItemProps {
  comment: CommentType;
  onEditComment?: (commentId: number, content: string) => void;
  onDeleteComment?: (commentId: number) => void;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const timeAgo = getRemainedTimeText({
    dateString: comment.createdAt,
    suffix: '전',
  });

  const handleLikeClick = () => {
    console.log('좋아요 클릭이요');
  };

  return (
    <div className="flex items-start gap-[10px]">
      <img
        src={comment.author.profileUrl}
        className="mt-[5px] w-[20px] h-[20px] rounded-full flex-shrink-0"
        alt="프로필 이미지"
      />

      <div className="flex-1">
        <div className="flex items-center gap-[6px] mb-1">
          <span className="text-body-1">{comment.author.nickname}</span>
          <span className="text-body-2-long text-gray-600">{timeAgo}</span>
        </div>

        <p className="text-body-2 text-gray-800 break-words">
          {comment.content}
        </p>

        {/* 좋아요 버튼 */}
        <div className="flex items-center gap-1 mt-2 text-gray-600">
          <button
            onClick={handleLikeClick}
            className={`flex items-center gap-1`}
          >
            <Icon
              name={
                comment.like.liked ? 'ThumbUpFillGray' : 'ThumbUpOutlineGray'
              }
              size="small"
            />
            <span className="text-body-2-long">{comment.like.likeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

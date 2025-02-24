import Icon from '@/components/common/Icon';
import useComment from '@/components/vote-detail/Comment/CommentItems/hooks';
import { useParams } from 'react-router-dom';

export default function CommentItem() {
  const { postId } = useParams();
  const { commentsData } = useComment(Number(postId));

  if (!commentsData) return <div>로딩 중...</div>;

  return (
    <div className="flex flex-col mb-md ml-sm">
      {commentsData.data.map((comment) => (
        <div key={comment.commentId} className="flex flex-col mb-md">
          <div className="flex items-center">
            <Icon name="HeartOutline" size="small" />
            <span className="ml-sm text-title-small">
              {comment.author.nickname}
            </span>
          </div>

          <div className="px-10 mt-1 break-words text-body-1-normal">
            {comment.content}
          </div>
        </div>
      ))}
    </div>
  );
}

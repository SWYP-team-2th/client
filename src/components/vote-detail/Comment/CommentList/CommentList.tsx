import { useParams } from 'react-router-dom';
import pencilImage from '@/assets/images/vote-detail/pencil.png';
import CommentItem from '@/components/vote-detail/Comment/CommentItems/CommentItem';
import useComment from '@/components/vote-detail/Comment/CommentList/hooks';

export default function CommentList() {
  const { postId } = useParams<{ postId: string }>();
  const { commentsData } = useComment(Number(postId));

  const visibleComments = commentsData.data.slice(0, 3);

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <div className="text-title-large mt-lg pl-sm pb-[9px]">
        한마디 ({commentsData.data.length})
      </div>
      <hr className="text-gray-300 mb-[20px]" />

      {commentsData.data.length === 0 ? (
        <div className="flex items-center justify-center text-center flex-col mb-[50px]">
          <img src={pencilImage} className="w-16 h-16 opacity-50" />
          <p className="text-title-small">
            아직 댓글이 없어요 <br />
            가장 먼저 한마디를 남겨보세요.
          </p>
        </div>
      ) : (
        <>
          {visibleComments.map((comment) => (
            <CommentItem key={comment.commentId} comment={comment} />
          ))}

          {commentsData.data.length > 3 && (
            <div className="text-center text-accent-800 mb-[20px]">
              <span className="cursor-pointer">더보기</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

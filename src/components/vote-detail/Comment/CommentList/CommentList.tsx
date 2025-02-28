import { useNavigate, useParams } from 'react-router-dom';
import pencilImage from '@/assets/images/vote-detail/pencil.png';
import CommentItem from '@/components/vote-detail/Comment/CommentItems/CommentItem';
import useComment from '@/components/vote-detail/Comment/CommentList/hooks';

export default function CommentList() {
  const { postId } = useParams<{ postId: string }>();
  const { commentsData } = useComment();
  const navigate = useNavigate();

  const visibleComments = commentsData.data.slice(0, 3);

  return (
    <div className="max-h-[400px]">
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
          <div className="overflow-y-auto max-h-[267px]">
            {visibleComments.map((comment) => (
              <CommentItem key={comment.commentId} comment={comment} />
            ))}
          </div>

          {commentsData.data.length > 3 && (
            <div className="text-center text-accent-800">
              <button
                onClick={() => navigate(`/votes/${postId}/comments`)}
                className="cursor-pointer"
              >
                더보기
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

import { useNavigate, useParams } from 'react-router-dom';
import pencilImage from '@/assets/images/vote-detail/pencil.png';
import CommentItem from '@/components/vote-detail/Comment/CommentItems/CommentItem';
import useComment from '@/components/vote-detail/Comment/CommentList/hooks';

export default function CommentList() {
  const { shareUrl } = useParams<{ shareUrl: string }>();
  const { commentsData } = useComment();
  const navigate = useNavigate();

  const comments = commentsData?.pages.flatMap((page) => page.data);

  const visibleComments = comments?.slice(0, 3);

  return (
    <div className="max-h-[400px]">
      <div className="text-title-large mt-lg pl-sm pb-[9px]">
        한마디 ({comments?.length})
      </div>
      <hr className="text-gray-300 mb-[20px]" />

      {comments?.length === 0 ? (
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
            {visibleComments?.map((comment) => (
              <CommentItem key={comment.commentId} comment={comment} />
            ))}
          </div>

          {comments?.length && comments.length > 3 && (
            <div className="text-center text-accent-800">
              <button
                onClick={() => navigate(`/votes/${shareUrl}/comments`)}
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

import useCommentDetail from '../hooks';
import Loading from '@/components/common/Loading';
import CommentItem from '@/components/vote-detail/Comment/CommentItems';

export default function CommentList() {
  const { comments, observerRef, isLoading } = useCommentDetail();

  return (
    <div className="h-full overflow-y-auto">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="text-title-large mt-lg pl-sm pb-[9px]">
            한마디 ({comments?.length})
          </div>
          <hr className="text-gray-300 mb-[20px]" />

          <div>
            {comments?.map((comment) => (
              <CommentItem key={comment.commentId} comment={comment} />
            ))}
            <div ref={observerRef} style={{ height: '10px' }} />
          </div>
        </>
      )}
    </div>
  );
}

import { CommentBottomSheet } from './index';
import useGetComments from '@/api/useGetComments';
import { useBottomSheet } from '@/components/common/BottomSheet/hooks';
import Icon from '@/components/common/Icon';

interface CommentSectionProps {
  postId: number;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { openBottomSheet } = useBottomSheet();

  // 댓글 미리보기 최대 1개까지 보여주기
  const { data: commentsData } = useGetComments(postId, 1);
  const previewComments = commentsData?.comments.data || [];
  const commentCount = commentsData?.commentCount || 0;

  const handleCommentClick = () => {
    openBottomSheet(<CommentBottomSheet postId={postId} />);
  };

  return (
    <div className="w-full px-5">
      {/* 댓글 섹션 */}
      <div className="cursor-pointer" onClick={handleCommentClick}>
        <div className="flex items-center gap-2 mb-2">
          <Icon name="MessageOutline" size="medium" />
          <span className="text-headline-1">댓글({commentCount}개)</span>
        </div>

        {/* 댓글 미리보기 */}
        {previewComments.length > 0 ? (
          <div className="space-y-3 ml-[33px]">
            {previewComments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-body-1-long text-gray-800">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-4 ml-[33px]">
            <p className="text-body-2 text-gray-500">아직 댓글이 없어요.</p>
          </div>
        )}
      </div>
    </div>
  );
}

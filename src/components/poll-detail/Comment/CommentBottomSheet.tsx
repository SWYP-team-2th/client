import { useState, useRef } from 'react';
import { CommentItem } from './index';
import useAddComment from '@/api/useAddComment';
import useGetComments from '@/api/useGetComments';
import BottomSheet from '@/components/common/BottomSheet';
import Icon from '@/components/common/Icon';
import Loading from '@/components/common/Loading';
import TextInput from '@/components/common/TextInput';
import useToast from '@/components/common/Toast/hooks';

interface CommentBottomSheetProps {
  postId: number;
}

export default function CommentBottomSheet({
  postId,
}: CommentBottomSheetProps) {
  const [content, setContent] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { error: showErrorToast } = useToast();
  const { data: commentsData, isLoading } = useGetComments(postId, 10);

  // 댓글 추가
  const { mutate: addComment, isPending: isAddCommentPending } = useAddComment({
    onSuccess: () => {
      setContent('');
    },
    onError: () => {
      showErrorToast({
        title: '댓글 작성 실패',
        description: '댓글 작성 중 오류가 발생했습니다. 다시 시도해주세요.',
      });
    },
  });

  const comments = commentsData?.comments.data || [];
  const commentCount = commentsData?.commentCount || 0;

  const handleSendComment = () => {
    if (content.trim() === '') {
      setContent('');
      inputRef.current?.focus();
      return;
    }

    addComment({ postId, content });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      handleSendComment();
    }
  };

  return (
    <BottomSheet title={`댓글(${commentCount}개)`} hasCloseButton>
      <div className="flex flex-col h-[65vh]">
        {/* 댓글 리스트 */}
        <div className="flex-1 overflow-y-auto mb-4 px-5 mt-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loading />
            </div>
          ) : comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Icon
                name="MessageOutline"
                size="large"
                className="text-gray-400 mb-2"
              />
              <p className="text-body-1 text-gray-500 mb-1">
                아직 댓글이 없어요.
              </p>
              <p className="text-body-2 text-gray-400">
                가장 먼저 한 마디를 남겨보세요.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </div>

        {/* TextInput */}
        <div className="pt-4 px-6">
          <TextInput
            ref={inputRef}
            placeholder="내용 입력"
            variant="solid"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isAddCommentPending}
            rightNode={
              isAddCommentPending ? (
                <Loading className="w-5 h-5" />
              ) : (
                <button
                  className="cursor-pointer p-1"
                  onClick={handleSendComment}
                  disabled={!content.trim()}
                >
                  <Icon name="SendGray" size="small" />
                </button>
              )
            }
          />
        </div>
      </div>
    </BottomSheet>
  );
}

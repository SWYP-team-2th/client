import { useQueryClient } from '@tanstack/react-query';
import { useState, useRef, useMemo } from 'react';
import { CommentItem } from './index';
import useAddComment from '@/api/useAddComment';
import { useGetComments } from '@/api/useGetComments';
import useUpdateComment from '@/api/useUpdateComment';
import BottomSheet from '@/components/common/BottomSheet';
import Icon from '@/components/common/Icon';
import InfiniteScroller from '@/components/common/InfiniteScroller';
import Loading from '@/components/common/Loading';
import TextInput from '@/components/common/TextInput';
import useToast from '@/components/common/Toast/hooks';
import { CommentsResponse } from '@/types/comment';

interface CommentBottomSheetProps {
  postId: number;
  onDeleteComment: (commentId: number) => void;
}

export default function CommentBottomSheet({
  postId,
  onDeleteComment,
}: CommentBottomSheetProps) {
  const [content, setContent] = useState('');
  const [editingComment, setEditingComment] = useState<{
    id: number;
    content: string;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const { success: showSuccessToast, error: showErrorToast } = useToast();
  const {
    data: commentsData,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetComments(postId, 10);

  // 댓글 추가
  const { mutate: addComment, isPending: isAddCommentPending } = useAddComment({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      setContent('');
    },
    onError: () => {
      showErrorToast({
        title: '댓글 작성 실패',
        description: '댓글 작성 중 오류가 발생했습니다. 다시 시도해주세요.',
      });
    },
  });

  // 댓글 수정
  const { mutate: updateComment } = useUpdateComment({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      setContent('');
      setEditingComment(null);
      showSuccessToast({
        title: '댓글이 수정되었습니다.',
      });
    },
    onError: () => {
      showErrorToast({
        title: '댓글 수정 실패',
        description: '댓글 수정 중 오류가 발생했습니다. 다시 시도해주세요.',
      });
    },
  });

  const comments = useMemo(
    () =>
      commentsData?.pages.flatMap(
        (page: CommentsResponse) => page.comments.data,
      ) || [],
    [commentsData],
  );

  const commentCount = useMemo(
    () => commentsData?.pages[0]?.commentCount || 0,
    [commentsData],
  );

  const handleSendComment = () => {
    if (content.trim() === '') {
      setContent('');
      inputRef.current?.focus();
      return;
    }

    if (editingComment) {
      // 댓글 수정
      updateComment({ postId, commentId: editingComment.id, content });
    } else {
      // 댓글 추가
      addComment({ postId, content });
    }
  };

  const handleEditComment = (commentId: number, commentContent: string) => {
    setContent(commentContent);
    setEditingComment({ id: commentId, content: commentContent });
    inputRef.current?.focus();
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
          <InfiniteScroller
            className="space-y-4"
            data={comments}
            renderItem={(comment) => (
              <CommentItem
                comment={comment}
                onEditComment={handleEditComment}
                onDeleteComment={onDeleteComment}
              />
            )}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={isLoading}
            keyExtractor={(comment) => comment.id}
            threshold={0.1}
            rootMargin="100px"
            emptyComponent={
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
            }
          />
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

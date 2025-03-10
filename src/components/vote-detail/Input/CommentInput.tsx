import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAddComment from '@/api/useAddComment';
import useGetMyInfo from '@/api/useGetMyInfo';
import useGetVoteDetail from '@/api/useGetVoteDetail';
import useEditComment from '@/api/useUpdateComment';
import { useDialog } from '@/components/common/Dialog/hooks';
import GuestConfirmDialog from '@/components/common/GuestConfirmDialog/GuestConfirmDialog';
import Icon from '@/components/common/Icon';
import LoginDialog from '@/components/common/LoginDialog';
import TextInput from '@/components/common/TextInput';
import { getRole } from '@/components/login/Auth/token';

interface EditingComment {
  commentId: number;
  content: string;
}

interface CommentInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  editingComment?: EditingComment | null;
  onEditComplete?: () => void;
}

export default function CommentInput({
  inputRef,
  editingComment,
  onEditComplete,
}: CommentInputProps) {
  const [content, setContent] = useState('');
  const { shareUrl } = useParams<{ shareUrl: string }>();
  const { data: myInfo } = useGetMyInfo();
  const { openDialog } = useDialog();
  const { data: voteDetail } = useGetVoteDetail(shareUrl ?? '');
  const { mutate: addComment } = useAddComment();
  const { mutate: editComment } = useEditComment();

  useEffect(() => {
    if (editingComment) {
      setContent(editingComment.content);
    } else {
      setContent('');
    }
  }, [editingComment]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      handleSendComment();
    }
  };

  const handleSendComment = () => {
    if (content.trim() === '') {
      setContent('');
      inputRef.current?.focus();
      return;
    }

    if (editingComment) {
      editComment(
        {
          postId: voteDetail.id,
          commentId: editingComment.commentId,
          content,
        },
        {
          onSuccess: () => {
            setContent('');
            onEditComplete?.();
          },
        },
      );
    } else {
      addComment(
        { postId: voteDetail.id, content },
        {
          onSuccess: () => {
            setContent('');
          },
        },
      );
    }
  };

  const handleFocusInput = () => {
    if (!myInfo) {
      openDialog(<LoginDialog />);
      return;
    }

    if (myInfo && getRole() === 'GUEST') {
      openDialog(
        <GuestConfirmDialog title="게스트 계정은 한마디 남기기가 불가능해요 😢" />,
      );
    }
  };

  return (
    <div className="w-full px-lg pb-[30px] py-3 bg-gray-100 bottom-0 fixed left-1/2 -translate-x-1/2 z-4 max-w-[480px]">
      <TextInput
        ref={inputRef}
        placeholder="댓글을 입력해주세요"
        variant="solid"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocusInput}
        readOnly={!myInfo}
        rightNode={
          <button className="cursor-pointer" onClick={handleSendComment}>
            <Icon name="Send" size="medium" />
          </button>
        }
      />
    </div>
  );
}

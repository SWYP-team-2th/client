import { SetStateAction, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAddComment from '@/api/useAddComment';
import useGetMyInfo from '@/api/useGetMyInfo';
import useGetVoteDetail from '@/api/useGetVoteDetail';
import { useDialog } from '@/components/common/Dialog/hooks';
import GuestConfirmDialog from '@/components/common/GuestConfirmDialog/GuestConfirmDialog';
import Icon from '@/components/common/Icon';
import LoginDialog from '@/components/common/LoginDialog';
import TextInput from '@/components/common/TextInput';
import { getRole } from '@/components/login/Auth/token';

export default function CommentInput() {
  const [content, setContent] = useState('');
  const contentRef = useRef<HTMLInputElement>(null);
  const { shareUrl } = useParams<{ shareUrl: string }>();
  const { data: myInfo } = useGetMyInfo();
  const { openDialog } = useDialog();

  const { data: voteDetail } = useGetVoteDetail(shareUrl ?? '');

  const { mutate: addComment } = useAddComment();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing == false) {
      handleSendComment();
    }
  };

  const onChangeValue = (e: { target: { value: SetStateAction<string> } }) => {
    setContent(e.target.value);
  };

  const handleSendComment = () => {
    if (content.trim() === '') {
      setContent('');
      contentRef.current?.focus();
      return;
    }

    if (voteDetail.id) {
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
    <div className="w-full px-lg py-3 bg-gray-100 bottom-0 fixed left-1/2 -translate-x-1/2 z-4 max-w-[480px]">
      <TextInput
        ref={contentRef}
        placeholder="댓글을 입력해주세요"
        variant="solid"
        value={content}
        onChange={onChangeValue}
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

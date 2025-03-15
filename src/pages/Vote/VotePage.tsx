import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetMyInfo from '@/api/useGetMyInfo';
import Logo from '@/assets/icons/logo.svg?react';
import { useDialog } from '@/components/common/Dialog/hooks';
import GuestConfirmDialog from '@/components/common/GuestConfirmDialog/GuestConfirmDialog';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import LoginDialog from '@/components/common/LoginDialog';
import { getRole } from '@/components/login/Auth/token';
import CommentList from '@/components/vote-detail/Comment/CommentList';
import CommentInput from '@/components/vote-detail/Input/CommentInput';
import VoteAuthorInfo from '@/components/vote-detail/Top/VoteAuthorInfo';
import VoteSection from '@/components/vote-detail/Vote/VoteSection';

interface EditingComment {
  commentId: number;
  content: string;
}

export default function VotePage() {
  const navigate = useNavigate();
  const { openDialog } = useDialog();
  const { data: myInfo } = useGetMyInfo();

  const inputRef = useRef<HTMLInputElement>(null);

  const [editingComment, setEditingComment] = useState<EditingComment | null>(
    null,
  );

  const handleEditComment = (commentId: number, content: string) => {
    setEditingComment({ commentId, content });

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleEditComplete = () => {
    setEditingComment(null);
  };

  const handleClickUserButton = () => {
    if (!myInfo) {
      openDialog(<LoginDialog />);
      return;
    }

    if (myInfo && getRole() === 'GUEST') {
      openDialog(
        <GuestConfirmDialog title="게스트 계정은 뽀또본부로 이동할 수 없어요 😢" />,
      );
      return;
    }

    navigate(`/user/${myInfo?.id}`);
  };

  return (
    <div className="w-full bg-gray-100 h-screen flex itmes-center flex-col pt-[75px] relative">
      <Header
        leftNode={
          <Icon
            className="cursor-pointer"
            onClick={() => navigate(-1)}
            name="ArrowLeft"
            size="medium"
          />
        }
        centerNode={
          <Logo
            style={{ width: 50, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
        }
        rightNode={
          <Icon
            className="cursor-pointer"
            onClick={handleClickUserButton}
            name="UserFill"
            size="medium"
          />
        }
      />
      <div className="h-[calc(100dvh-100px)] overflow-y-auto px-6 py-[10px] rounded-2xl">
        <VoteAuthorInfo />
        <VoteSection />
        <hr className="border-t-[5px] border-gray-300" />
        <CommentList onEditComment={handleEditComment} />
      </div>

      <CommentInput
        inputRef={inputRef}
        editingComment={editingComment}
        onEditComplete={handleEditComplete}
      />
    </div>
  );
}

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/assets/icons/logo.svg?react';
import CommentList from '@/components/comment-detail/CommentList';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import CommentInput from '@/components/vote-detail/Input';

interface EditingComment {
  commentId: number;
  content: string;
}

export default function VoteCommentDetailPage() {
  const navigate = useNavigate();
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

  return (
    <div className="bg-gray-200 w-full h-screen flex items-center flex-col py-[85px] relative">
      <Header
        leftNode={
          <Icon
            className="cursor-pointer"
            onClick={() => navigate(-1)}
            name="ArrowLeft"
            size="large"
          />
        }
        centerNode={<Logo style={{ width: '50px' }} />}
        rightNode={
          <Icon className="cursor-pointer" name="UserFill" size="large" />
        }
      />

      <div className="w-full h-full">
        <div className="h-full mx-[15px] px-[10px] pt-[18px] pb-1 bg-gray-100 rounded-2xl shadow-[0px_2px_20px_0px_rgba(0,0,0,0.03),0px_20px_15px_0px_rgba(0,0,0,0.02),0px_8px_25px_0px_rgba(0,0,0,0.04)]">
          <CommentList onEditComment={handleEditComment} />
        </div>

        <CommentInput
          inputRef={inputRef}
          editingComment={editingComment}
          onEditComplete={handleEditComplete}
        />
      </div>
    </div>
  );
}

import { Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Logo from '@/assets/icons/logo.svg?react';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import Loading from '@/components/common/Loading';
import CommentItem from '@/components/vote-detail/Comment/CommentItems';
import useComment from '@/components/vote-detail/Comment/CommentList/hooks';
import CommentInput from '@/components/vote-detail/Input';

export default function VoteCommentDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const { commentsData } = useComment(Number(postId));
  const navigate = useNavigate();

  return (
    <div className="bg-gray-200 w-full h-screen flex items-center flex-col pt-[85px] relative">
      <Header
        leftNode={
          <Icon
            className="cursor-pointer"
            onClick={() => navigate(-1)}
            name="ArrowLeft"
            size="large"
          />
        }
        centerNode={
          <Logo
            style={{
              width: '70px',
            }}
          />
        }
        rightNode={
          <Icon className="cursor-pointer" name="UserFill" size="large" />
        }
      />

      <div className="w-full">
        <Suspense fallback={<Loading />}>
          <div className="mx-[15px] px-[10px] pt-[18px] pb-1 bg-gray-100 rounded-2xl shadow-[0px_2px_20px_0px_rgba(0,0,0,0.03),0px_20px_15px_0px_rgba(0,0,0,0.02),0px_8px_25px_0px_rgba(0,0,0,0.04)]">
            <div className="h-[791px] overflow-y-auto">
              <div className="text-title-large mt-lg pl-sm pb-[9px]">
                한마디 ({commentsData.data.length})
              </div>
              <hr className="text-gray-300 mb-[20px]" />

              <div>
                {commentsData.data.map((comment) => (
                  <CommentItem key={comment.commentId} comment={comment} />
                ))}
              </div>
            </div>
          </div>
        </Suspense>
        <CommentInput />
      </div>
    </div>
  );
}

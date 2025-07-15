import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import CardList from '@/components/poll-detail/Card/CardList';
import PollInfo from '@/components/poll-detail/Info/PollInfo';
import { usePost } from '@/hooks/usePost';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';
export default function PollDetailPage() {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();

  if (!postId) {
    return <div>게시글 ID가 없습니다.</div>;
  }

  const { data: post } = usePost(postId);

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <div className="w-full bg-gray-100 h-screen flex itmes-center flex-col pt-[60px] relative gap-4">
      <Header
        className="bg-gray-100"
        leftNode={
          <Icon
            className="cursor-pointer"
            onClick={() => navigate(-1)}
            name="ArrowLeft"
            size="medium"
          />
        }
        centerNode="투표"
        rightNode={
          <Icon className="cursor-pointer" name="BellOutline" size="medium" />
        }
      />

      <PollInfo post={post} />

      {/* 투표  선탹지 */}
      <CardList post={post} />
    </div>
  );
}

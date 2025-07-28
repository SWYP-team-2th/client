import { useNavigate, useParams } from 'react-router-dom';
import { useGetPost } from '@/api/useGetPost';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import ShareButton from '@/components/poll-detail/Button/ShareButton';
import CardList from '@/components/poll-detail/Card/CardList';
import PollInfo from '@/components/poll-detail/Info/PollInfo';
export default function PollDetailPage() {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();

  if (!postId) {
    return <div>게시글 ID가 없습니다.</div>;
  }

  const { data: post } = useGetPost(postId);

  if (!post) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-600">
        존재하지 않는 투표예요.
      </div>
    );
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

      <PollInfo
        author={post.author}
        createdAt={post.createdAt}
        status={post.status}
        closeOptions={post.closeOptions}
        title={post.title}
        description={post.description}
        voterCount={post.voterCount}
        commentCount={post.commentCount}
      />

      {/* 투표  선탹지 */}
      <CardList pollOptions={post.pollOptions} pollChoices={post.pollChoices} />
      <ShareButton shareUrl={post.shareUrl} />
    </div>
  );
}

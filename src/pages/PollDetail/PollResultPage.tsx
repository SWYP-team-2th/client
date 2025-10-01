import { useNavigate, useParams } from 'react-router-dom';
import { useGetNotificationPresent } from '@/api/useGetNotificationPresent';
import { useGetPost } from '@/api/useGetPost';
import { useGetVotesResult } from '@/api/useGetVotesResult';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import Loading from '@/components/common/Loading/Loading';
import ResultItem from '@/components/poll-detail/Result/ResultItem';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';

export default function PollResultPage() {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const { data: notificationPresent } = useGetNotificationPresent();

  if (!postId) {
    return <div>없는 게시글이용</div>;
  }

  const { data: post, isLoading: isPostLoading } = useGetPost(postId);
  const { data: result, isLoading: isResultLoading } = useGetVotesResult({
    postId,
    options: {
      enabled: !!postId,
    },
  });

  if (isPostLoading || isResultLoading) return <Loading />;
  if (!post || !result) return <NotFoundPage />;

  return (
    <div className="w-full bg-gray-100 min-h-screen flex flex-col pt-[80px] relative">
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
          <Icon
            className="cursor-pointer"
            name={
              notificationPresent?.present ? 'BellOutlinePoint' : 'BellOutline'
            }
            size="medium"
            onClick={() => navigate('/notifications')}
          />
        }
      />

      {/* 투표 결과 섹션 */}
      <div className="px-5 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div className="text-headline-1 text-gray-800">투표 결과</div>
          <div className="flex items-center gap-1 text-gray-500">
            <Icon name="DeadLineGray" size="small" />
            <span className="text-body-2">{post.voterCount}표</span>
          </div>
        </div>
        {result && result.length > 0 && (
          <div className="space-y-4">
            {result.map((choice, index) => (
              <ResultItem
                key={choice.id}
                rank={index + 1}
                title={choice.title}
                imageUrl={choice.imageUrl}
                voteCount={choice.voteCount}
                percentage={parseFloat(choice.voteRatio)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

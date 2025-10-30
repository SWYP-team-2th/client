import { useNavigate, useParams } from 'react-router-dom';
import { useGetNotificationPresent } from '@/api/useGetNotificationPresent';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import Loading from '@/components/common/Loading/Loading';
import PollActionButtons from '@/components/poll-detail/Button/PollActionButtons';
import CardList from '@/components/poll-detail/Card/CardList';
import { CommentSection } from '@/components/poll-detail/Comment';
import PollInfo from '@/components/poll-detail/Info/PollInfo';
import ResultList from '@/components/poll-detail/Result/ResultList';
import { SelectionProvider } from '@/components/poll-detail/SelectionContext';
import { usePollDetail } from '@/hooks/usePollDetail';
import NotFoundPage from '@/pages/NotFound/NotFoundPage';

export default function PollDetailPage() {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const { data: notificationPresent } = useGetNotificationPresent();

  const { post, result, isVoted, isLoading } = usePollDetail(postId ?? '');

  if (isLoading) return <Loading />;

  if (!postId || !post) {
    return <NotFoundPage />;
  }

  const showResultList = post.isAuthor || isVoted || post.status === 'CLOSED';

  return (
    <div className="w-full bg-gray-100 h-screen flex itmes-center flex-col pt-[60px] relative">
      <Header
        className="bg-gray-100"
        leftNode={
          <Icon
            className="cursor-pointer"
            onClick={() => navigate('/')}
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

      <PollInfo
        author={post.author}
        isAuthor={post.isAuthor}
        createdAt={post.createdAt}
        status={post.status}
        closeOption={post.closeOption}
        pollOption={post.pollOption}
        title={post.title}
        description={post.description}
        voterCount={post.voterCount}
        commentCount={post.commentCount}
        postId={parseInt(postId)}
      />

      {/* 투표 결과 섹션 */}
      {showResultList && result && (
        <div className="px-5 border-y-[1px] border-gray-200 mb-[30px]">
          <div className="text-headline-1 text-gray-800 mt-[35px]">
            투표 결과
          </div>
          <ResultList result={result} />
        </div>
      )}

      <SelectionProvider post={post}>
        {/* 투표  선탹지 */}
        <CardList
          pollChoices={post.pollChoices}
          isVoted={isVoted}
          status={post.status}
        />

        {/* 투표 버튼, 공유 버튼 */}
        <PollActionButtons
          shareUrl={post.shareUrl}
          postId={parseInt(postId)}
          isVoted={isVoted}
          isVotedClosed={post.status === 'CLOSED'}
        />

        {/* 댓글 섹션 */}
        {post.pollOption.commentActive === 'OPEN' && (
          <CommentSection postId={parseInt(postId)} />
        )}
      </SelectionProvider>
    </div>
  );
}

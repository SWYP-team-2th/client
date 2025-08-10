import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import ResultItem from '@/components/poll-detail/Result/ResultItem';
import { usePollResult } from '@/components/poll-detail/hooks';

export default function PollResultPage() {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();

  if (!postId) {
    return <div>없는 게시글이용</div>;
  }

  const { post, sortedChoices, totalVotes, calculatePercentage, isLoading } =
    usePollResult(postId);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-600">
        로딩 중이용
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-600">
        존재하지 않는 투표예요.
      </div>
    );
  }

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
          <Icon className="cursor-pointer" name="BellOutline" size="medium" />
        }
      />

      {/* 투표 결과 섹션 */}
      <div className="px-5 flex-1">
        <div className="flex items-center justify-between">
          <div className="text-headline-1 text-gray-800">투표 결과</div>
          <div className="flex items-center gap-2 text-gray-500">
            <Icon name="DeadLineGray" size="small" />
            <span className="text-body-2">{totalVotes}표</span>
          </div>
        </div>
        {sortedChoices.length > 0 && (
          <div className="space-y-4">
            {sortedChoices.map((choice, index) => (
              <ResultItem
                key={choice.id}
                rank={index + 1}
                title={choice.title}
                imageUrl={choice.imageUrl}
                voteCount={choice.voteCount}
                percentage={calculatePercentage(choice.voteCount)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

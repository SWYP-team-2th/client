import { useNavigate } from 'react-router-dom';
import Icon from '@/components/common/Icon';
import ResultItem from '@/components/poll-detail/Result/ResultItem';

interface ResultChoice {
  id: number;
  title: string;
  imageUrl: string;
  voteCount: number;
}

interface ResultListProps {
  choices: ResultChoice[];
  showAll?: boolean;
  postId?: number;
}

export default function ResultList({
  choices,
  showAll = true,
  postId,
}: ResultListProps) {
  const navigate = useNavigate();
  const sorted = [...choices].sort((a, b) => b.voteCount - a.voteCount);
  const totalVotes = sorted.reduce((sum, c) => sum + c.voteCount, 0);

  const visible = showAll ? sorted : sorted.slice(0, 3);

  const handleShowAllResults = () => {
    if (postId) {
      navigate(`/posts/${postId}/result`);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center my-6">
      {visible.map((item, index) => (
        <ResultItem
          key={item.id}
          rank={index + 1}
          title={item.title}
          imageUrl={item.imageUrl}
          voteCount={item.voteCount}
          percentage={
            totalVotes === 0 ? 0 : (item.voteCount / totalVotes) * 100
          }
        />
      ))}

      {!showAll && choices.length > 3 && (
        <button
          type="button"
          onClick={handleShowAllResults}
          className="text-gray-600 text-headline-3 flex items-center gap-1"
        >
          결과 전체보기
          <Icon name="ArrowRight" size="small" />
        </button>
      )}
    </div>
  );
}

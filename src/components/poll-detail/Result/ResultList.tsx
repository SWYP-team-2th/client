import { useNavigate, useParams } from 'react-router-dom';
import Icon from '@/components/common/Icon';
import ResultItem from '@/components/poll-detail/Result/ResultItem';

interface ResultChoice {
  id: number;
  title: string;
  imageUrl: string;
  voteCount: number;
  voteRatio: string;
}

interface ResultListProps {
  result: ResultChoice[];
}

export default function ResultList({ result }: ResultListProps) {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();

  const visible = result.length > 3 ? result.slice(0, 3) : result;

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
          percentage={parseFloat(item.voteRatio)}
        />
      ))}

      {result.length > 3 && (
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

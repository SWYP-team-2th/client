import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPost } from '@/api/useGetPost';
import { useGetResult } from '@/api/useGetResult';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import PollActionButtons from '@/components/poll-detail/Button/PollActionButtons';
import CardList from '@/components/poll-detail/Card/CardList';
import PollInfo from '@/components/poll-detail/Info/PollInfo';
import ResultList from '@/components/poll-detail/Result/ResultList';
import { SelectionProvider } from '@/components/poll-detail/SelectionContext';

export default function PollDetailPage() {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const [isVoted, setIsVoted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  if (!postId) {
    return <div>게시글 ID가 없습니다.</div>;
  }

  const { data: post } = useGetPost(postId);
  const { data: result } = useGetResult(postId);

  if (!post) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-600">
        존재하지 않는 투표예요.
      </div>
    );
  }

  const resultChoices = (result ?? []).map((result) => ({
    id: result.id,
    title: result.title,
    imageUrl: result.imageUrl,
    voteCount: result.voteCount,
  }));

  return (
    <div className="w-full bg-gray-100 h-screen flex itmes-center flex-col pt-[60px] relative">
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
        closeOption={post.closeOption}
        title={post.title}
        description={post.description}
        voterCount={post.voterCount}
        commentCount={post.commentCount}
      />

      {/* 투표 결과 섹션 */}
      {showResult && resultChoices.length > 0 && (
        <div className="px-5 border-y-[3px] border-gray-200 mb-[30px]">
          <div className="text-headline-1 text-gray-800 mt-[35px]">
            투표 결과
          </div>
          <ResultList
            choices={resultChoices}
            showAll={false}
            postId={parseInt(postId)}
          />
        </div>
      )}

      <SelectionProvider pollType={post.pollOption.pollType}>
        {/* 투표  선탹지 */}
        <CardList pollChoices={post.pollChoices} isVoted={isVoted} />

        {/* 투표 버튼, 공유 버튼 */}
        <PollActionButtons
          shareUrl={post.shareUrl}
          postId={parseInt(postId)}
          isVoted={isVoted}
          setIsVoted={setIsVoted}
          setShowResult={setShowResult}
        />
      </SelectionProvider>
    </div>
  );
}

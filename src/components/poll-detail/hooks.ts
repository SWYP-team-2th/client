import { useGetPost } from '@/api/useGetPost';
import { useGetResult } from '@/api/useGetResult';

export function usePollResult(postId: string) {
  const { data: post } = useGetPost(postId);
  const { data: result } = useGetResult(postId);

  const resultChoices = (result ?? []).map((result) => ({
    id: result.id,
    title: result.title,
    imageUrl: result.imageUrl,
    voteCount: result.voteCount,
    voteRatio: result.voteRatio,
  }));

  // 투표 수로 정렬 (내림차순)
  const sortedChoices = [...resultChoices].sort(
    (a, b) => b.voteCount - a.voteCount,
  );

  // 전체 투표 수 계산
  const totalVotes = sortedChoices.reduce(
    (sum, choice) => sum + choice.voteCount,
    0,
  );

  // 백분율 계산 함수
  const calculatePercentage = (voteCount: number) => {
    return totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
  };

  return {
    post,
    resultChoices,
    sortedChoices,
    totalVotes,
    calculatePercentage,
    isLoading: !post || !result,
  };
}

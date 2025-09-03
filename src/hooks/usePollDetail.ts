import { useMemo } from 'react';
import { useGetPost } from '@/api/useGetPost';
import { useGetVotesResult } from '@/api/useGetVotesResult';

export const usePollDetail = (postId: string) => {
  const { data: post, isLoading: isPostLoading } = useGetPost(postId);
  const isVoted = useMemo(
    () => post?.pollChoices.some((choice) => choice.voteId !== null) ?? false,
    [post],
  );

  const { data: result, isLoading: isResultLoading } = useGetVotesResult({
    postId,
    options: {
      enabled: !!postId && isVoted,
    },
  });

  const isLoading = isVoted ? isResultLoading || isPostLoading : isPostLoading;

  return {
    post,
    result,
    isVoted,
    isLoading,
  };
};

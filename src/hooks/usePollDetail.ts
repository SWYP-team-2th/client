import { useMemo } from 'react';
import { useGetPost } from '@/api/useGetPost';
import { useGetVotesStatus } from '@/api/useGetVotesStatus';

export const usePollDetail = (postId: string) => {
  const { data: post, isLoading: isPostLoading } = useGetPost(postId);
  const { data: result, isLoading: isResultLoading } =
    useGetVotesStatus(postId);

  const isVoted = useMemo(
    () => post?.pollChoices.some((choice) => choice.voteId !== null) ?? false,
    [post],
  );

  const isLoading = isPostLoading || isResultLoading;

  return {
    post,
    result,
    isVoted,
    isLoading,
  };
};

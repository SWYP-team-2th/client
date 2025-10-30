import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetPost } from '@/api/useGetPost';
import { useGetVotesResult } from '@/api/useGetVotesResult';

export const usePollDetail = (postId: string) => {
  const [searchParams] = useSearchParams();
  const { data: post, isLoading: isPostLoading } = useGetPost({
    postId,
    shareKey: searchParams.get('shareUrl') ?? undefined,
  });
  const isVoted = useMemo(
    () => post?.pollChoices.some((choice) => choice.voteId !== null) ?? false,
    [post],
  );

  const { data: result, isLoading: isResultLoading } = useGetVotesResult({
    postId,
    options: {
      enabled: !!postId && (isVoted || post?.status === 'CLOSED'),
    },
  });

  const isLoading =
    isVoted || post?.status === 'CLOSED'
      ? isResultLoading || isPostLoading
      : isPostLoading;

  return {
    post,
    result,
    isVoted,
    isLoading,
  };
};

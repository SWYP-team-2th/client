import { useParams } from 'react-router-dom';
import useGetComment from '@/api/useGetComment';
import useGetVoteDetail from '@/api/useGetVoteDetail';

export default function useComment(size: number) {
  const { shareUrl } = useParams<{ shareUrl: string }>();
  const { data: voteDetail, isLoading: isVoteDetailLoading } = useGetVoteDetail(
    shareUrl ?? '',
  );
  const {
    data: commentsData,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isCommentsLoading,
    fetchNextPage,
  } = useGetComment(voteDetail.id, size, {
    enabled: !!voteDetail.id,
  });

  return {
    commentsData,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isVoteDetailLoading || isCommentsLoading,
    fetchNextPage,
  };
}

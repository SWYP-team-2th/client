import { useParams } from 'react-router-dom';
import useGetComment from '@/api/useGetComment';
import useGetVoteDetail from '@/api/useGetVoteDetail';

export default function useComment() {
  const { shareUrl } = useParams<{ shareUrl: string }>();
  const { data: voteDetail } = useGetVoteDetail(shareUrl ?? '');
  const {
    data: commentsData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetComment(voteDetail.id, {
    enabled: !!voteDetail.id,
  });

  return {
    commentsData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
}

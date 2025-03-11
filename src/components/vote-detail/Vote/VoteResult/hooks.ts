import useGetVoteDetail from '@/api/useGetVoteDetail';
import useGetVoteStatus from '@/api/useGetVoteStatus';

interface UseVoteStatusOptions {
  postId: number;
  shareUrl: string;
}

export default function useVoteStatus({ shareUrl }: UseVoteStatusOptions) {
  const { data: voteDetail } = useGetVoteDetail(shareUrl);
  const { data: voteStatus } = useGetVoteStatus(voteDetail.id, {
    enabled: !!voteDetail.id,
  });

  const userHasVoted =
    voteDetail?.images?.some((image) => image.voteId) ?? false;

  return {
    voteStatus,
    userHasVoted,
  };
}

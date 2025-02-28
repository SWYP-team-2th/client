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

  // ✅ 유저가 투표했는지 여부 확인 (images 배열 중 voted: true가 있는지 체크)
  const userHasVoted =
    voteDetail?.images?.some((image) => image.voted) ?? false;

  return {
    voteStatus,
    userHasVoted, // ✅ 유저 투표 여부 추가
  };
}

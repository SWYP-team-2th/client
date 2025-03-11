import { useParams } from 'react-router-dom';
import useGetVoteDetail from '@/api/useGetVoteDetail';
import useGetVoteStatus from '@/api/useGetVoteStatus';

export default function useVoteDetail(shareUrl: string) {
  const { data: voteDetail } = useGetVoteDetail(shareUrl);

  return {
    voteDetail,
  };
}

export const useGetBestPickImageIds = (): number[] => {
  const { shareUrl } = useParams<{ shareUrl: string }>();
  const { data: voteDetail } = useGetVoteDetail(shareUrl ?? '');
  const { data: voteStatus } = useGetVoteStatus(voteDetail.id, {
    enabled: !!voteDetail.id,
  });

  if (voteDetail.status === 'PROGRESS') {
    return [];
  }

  const maxVoteCount = Math.max(
    ...(voteStatus?.map((status) => status.voteCount) ?? []),
  );

  return (
    voteStatus
      ?.filter((status) => status.voteCount === maxVoteCount)
      .map((status) => status.id) ?? []
  );
};

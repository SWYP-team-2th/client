import { useParams } from 'react-router-dom';
import useGetVoteDetail from '@/api/useGetVoteDetail';
import useGetVoteStatus from '@/api/useGetVoteStatus';

export default function useVoteDetail(shareUrl: string) {
  const { data: voteDetail } = useGetVoteDetail(shareUrl);

  return {
    voteDetail,
  };
}

export const useGetImageStatus = (): {
  id: number;
  status: 'VOTED' | 'WIN';
} => {
  const { shareUrl } = useParams<{ shareUrl: string }>();
  const { data: voteDetail } = useGetVoteDetail(shareUrl ?? '');
  const { data: voteStatus } = useGetVoteStatus(voteDetail.id, {
    enabled: !!voteDetail.id,
  });

  if (voteDetail?.status === 'PROGRESS') {
    return {
      id: voteDetail.images.find((image) => image.voted)?.id ?? 0,
      status: 'VOTED',
    };
  }

  return {
    id:
      voteStatus?.find(
        (status) =>
          status.voteCount ===
          Math.max(...(voteStatus?.map((status) => status.voteCount) ?? [])),
      )?.id ?? 0,
    status: 'WIN',
  };
};

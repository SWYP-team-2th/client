import useGetVoteDetail from '@/api/useGetVoteDetail';

export default function useVoteDetail(shareUrl: string) {
  const { data: voteDetail } = useGetVoteDetail(shareUrl);

  return {
    voteDetail,
  };
}

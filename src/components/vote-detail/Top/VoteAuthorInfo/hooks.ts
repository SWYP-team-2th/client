import useGetVoteDetail from '@/api/useGetVoteDetail';

export default function useVoteDetail(postId: number) {
  const { data: voteDetail } = useGetVoteDetail(postId);

  return {
    voteDetail,
  };
}

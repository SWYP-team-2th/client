import useGetVoteDetail from '@/api/useGetVoteDetail';

export default function useVoteDetail() {
  const { data: topInfo } = useGetVoteDetail('1');
  return {
    topInfo,
  };
}

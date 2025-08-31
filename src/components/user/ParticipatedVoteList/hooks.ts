import { useParams } from 'react-router-dom';
import { useGetParticipatedVoteList } from '@/api/useGetParticipatedVoteList';

export default function useParticipatedVoteList() {
  const { userId } = useParams<{ userId: string }>();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetParticipatedVoteList({
      userId: userId ?? '',
    });

  const participatedVoteList = data?.pages.flatMap((page) => page.data);

  return {
    participatedVoteList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  };
}

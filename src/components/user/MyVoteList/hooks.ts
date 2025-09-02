import { useParams } from 'react-router-dom';
import { useGetMyVoteList } from '@/api/useGetMyVoteList';

export default function useMyVoteList() {
  const { userId } = useParams<{ userId: string }>();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetMyVoteList({
      userId: userId ?? '',
    });

  const myVoteList = data?.pages.flatMap((page) => page.data);

  return {
    myVoteList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  };
}

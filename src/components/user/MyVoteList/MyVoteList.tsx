import useMyVoteList from './hooks';
import Vote from '../Vote';
import ZeroUI from './ZeroUI';
import InfiniteScroller from '@/components/common/InfiniteScroller';

export default function MyVoteList() {
  const {
    myVoteList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useMyVoteList();

  return (
    <InfiniteScroller
      className="space-y-4"
      data={myVoteList}
      emptyComponent={<ZeroUI />}
      renderItem={(item) => (
        <Vote
          id={item.id}
          title={item.title}
          thumbnailImageUrl={item.thumbnailImageUrl}
          status={item.status}
          closeOptionDto={item.closeOptionDto}
          postVoteInfo={item.postVoteInfo}
        />
      )}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      keyExtractor={(item) => item.id}
    />
  );
}

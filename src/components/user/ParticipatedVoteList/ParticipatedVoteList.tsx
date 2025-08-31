import Vote from '../Vote';
import useParticipatedVoteList from './hooks';
import ZeroUI from './ZeroUI';
import InfiniteScroller from '@/components/common/InfiniteScroller';

export default function ParticipatedVoteList() {
  const {
    participatedVoteList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useParticipatedVoteList();

  return (
    <InfiniteScroller
      className="h-full"
      data={participatedVoteList}
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

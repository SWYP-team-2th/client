import FeedItem from './FeedItem';
import { useGetFeed } from '@/api/useGetFeed';
import InfiniteScroller from '@/components/common/InfiniteScroller';

export default function HomeFeed() {
  const {
    data: feed,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetFeed(10);

  const feeds = feed?.pages.flatMap((page) => page.data) || [];

  return (
    <InfiniteScroller
      className="space-y-4"
      data={feeds}
      renderItem={(item) => (
        <FeedItem
          id={item.id}
          author={item.author}
          status={item.status}
          title={item.title}
          thumbnailUrl={item.thumbnailUrl}
          voterCount={item.voterCount}
          commentCount={item.commentCount}
          createdAt={item.createdAt}
        />
      )}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      keyExtractor={(item) => item.id}
      threshold={0.1}
      rootMargin="100px"
      emptyComponent={
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <img
            src="/src/assets/images/my/EmptyMyVoteList.jpg"
            alt="빈 피드"
            className="w-32 h-32 mb-6 object-contain"
          />
          <p className="text-lg font-semibold text-gray-900 mb-2">
            아직 만든 투표가 없어요!
          </p>
          <p className="text-sm text-gray-600">
            첫 투표를 만들어 사람들의 선택을 받아보세요.
          </p>
        </div>
      }
    />
  );
}

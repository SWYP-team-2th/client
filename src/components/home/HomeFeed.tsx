import FeedItem from './FeedItem';
import useGetFeed from '@/api/useGetFeed';
import { FeedType } from '@/types/feed';

export default function HomeFeed() {
  const { data: feed, isLoading } = useGetFeed(10);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">로딩 중이염</div>
      </div>
    );
  }

  const feeds = feed?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="space-y-4">
      {feeds.map((item: FeedType) => (
        <FeedItem
          key={item.id}
          id={item.id}
          author={item.author}
          status={item.status}
          title={item.title}
          thumbnailUrl={item.thumbnailUrl}
          voterCount={item.voterCount}
          commentCount={item.commentCount}
          createdAt={item.createdAt}
        />
      ))}
    </div>
  );
}

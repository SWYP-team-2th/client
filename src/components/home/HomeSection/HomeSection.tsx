import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/common/Loading';
import ImageList from '@/components/home/HomeImages/ImageList';
import HomeInfo from '@/components/home/HomeInfo';
import HomeTaskCheck from '@/components/home/HomeTaskCheck';
import { FeedType } from '@/types/feed';

export default function HomeSection({ feed }: { feed: FeedType }) {
  const navigate = useNavigate();

  const handleClickFeed = () => {
    navigate(`/votes/${feed.shareUrl}`);
  };
  return (
    <div
      className="cursor-pointer pl-[10px] pt-[16px] pb-[13px] bg-gray-100 rounded-2xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.02),0px_2px_12px_0px_rgba(0,0,0,0.04),0px_4px_30px_0px_rgba(0,0,0,0.05)]"
      onClick={handleClickFeed}
    >
      <HomeInfo
        userId={feed.author.id}
        nickname={feed.author.nickname}
        profileUrl={feed.author.profileUrl}
        status={feed.status}
        description={feed.description}
        isAuthor={feed.isAuthor}
        shareUrl={feed.shareUrl}
      />
      <Suspense fallback={<Loading />}>
        <ImageList images={feed.images} shareUrl={feed.shareUrl} />
      </Suspense>
      <HomeTaskCheck
        participantCount={feed.participantCount}
        commentCount={feed.commentCount}
      />
    </div>
  );
}

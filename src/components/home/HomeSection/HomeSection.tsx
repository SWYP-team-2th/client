import ImageList from '@/components/home/HomeImages/ImageList';
import HomeInfo from '@/components/home/HomeInfo';
import HomeTaskCheck from '@/components/home/HomeTaskCheck';

interface ImageType {
  id: number;
  imageName: string;
  imageUrl: string;
  thumbnailUrl?: string;
  voteId?: number | null;
}

interface AuthorType {
  id: number;
  nickname: string;
  profileUrl: string;
}

interface FeedType {
  id: number;
  author: AuthorType;
  images: ImageType[];
  status: 'PROGRESS' | 'CLOSED';
  description: string;
  shareUrl: string;
  isAuthor: boolean;
  participantCount: number;
  commentCount: number;
}

export default function HomeSection({ feed }: { feed: FeedType }) {
  return (
    <div className="pl-[10px] pt-[16px] pb-[13px] bg-gray-100 rounded-2xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.02),0px_2px_12px_0px_rgba(0,0,0,0.04),0px_4px_30px_0px_rgba(0,0,0,0.05)]">
      <HomeInfo
        nickname={feed.author.nickname}
        profileUrl={feed.author.profileUrl}
        status={feed.status}
        description={feed.description}
        isAuthor={feed.isAuthor}
        shareUrl={feed.shareUrl}
      />
      <ImageList images={feed.images} shareUrl={feed.shareUrl} />
      <HomeTaskCheck
        participantCount={feed.participantCount}
        commentCount={feed.commentCount}
      />
    </div>
  );
}

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetFeed from '@/api/useGetFeed';
import useGetMyInfo from '@/api/useGetMyInfo';
import Logo from '@/assets/icons/logo.svg?react';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import Loading from '@/components/common/Loading';
import HomeSection from '@/components/home/HomeSection';
import { useHomePagenation } from '@/components/home/hooks';
import { getAccessToken } from '@/components/login/Auth/token';
import { FeedType } from '@/types/feed';

export default function Home() {
  const navigate = useNavigate();

  const {
    data: feed,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetFeed(10);
  const observerRef = useHomePagenation({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const feeds = feed?.pages.flatMap((page) => page.data);

  const accessToken = getAccessToken();

  const { data: myInfo, isLoading: isUserLoading } = useGetMyInfo({
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (!isUserLoading) {
      if (!myInfo?.id) {
        navigate('/onboarding', { replace: true });
      }
    }
  }, [myInfo, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gray-100">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-gray-300 flex flex-col w-full h-screen px-4 pt-[65px] overflow-y-auto">
      <Header
        leftNode={
          <Icon
            className="cursor-pointer"
            onClick={() => navigate(-1)}
            name="ArrowLeft"
            size="medium"
          />
        }
        centerNode={
          <Logo
            style={{ width: 50, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
        }
        rightNode={
          <Icon className="cursor-pointer" name="BellOutline" size="medium" />
        }
      />

      <div className="flex flex-col gap-3">
        {feeds?.map((post: FeedType) => (
          <HomeSection key={post.id} feed={post} />
        ))}
      </div>

      {hasNextPage && <div ref={observerRef} className="h-10" />}

      {isFetchingNextPage && (
        <div className="w-full flex justify-center py-2">
          <Loading />
        </div>
      )}
    </div>
  );
}

import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetFeed from '@/api/useGetFeed';
import Logo from '@/assets/icons/logo.svg?react';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import Loading from '@/components/common/Loading';
import HomeSection from '@/components/home/HomeSection';

export default function Home() {
  const navigate = useNavigate();
  const { data: feed } = useGetFeed();

  return (
    <div className="bg-gray-300 flex flex-col w-full h-screen px-4 pt-[65px]">
      <Header
        leftNode={
          <Icon
            className="cursor-pointer"
            onClick={() => navigate(-1)}
            name="ArrowLeft"
            size="medium"
          />
        }
        centerNode={<Logo style={{ width: '50px' }} />}
        rightNode={
          <Icon className="cursor-pointer" name="BellOutline" size="medium" />
        }
      />

      <Suspense fallback={<Loading />}>
        <div className="flex flex-col gap-3">
          {feed?.data.map((post) => <HomeSection key={post.id} feed={post} />)}
        </div>
      </Suspense>
    </div>
  );
}

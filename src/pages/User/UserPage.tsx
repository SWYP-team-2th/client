import { useParams } from 'react-router-dom';
import useGetUserInfo from '@/api/useGetUserInfo';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import Profile from '@/components/user/Profile';

export default function UserPage() {
  const { userId } = useParams();
  const { data: userInfo } = useGetUserInfo(Number(userId));

  return (
    <div className="h-full w-full min-h-lvh pt-15">
      <Header
        className="text-white bg-primary-500"
        leftNode={
          <Icon
            className="cursor-pointer"
            strokeColor="white"
            name="ArrowLeft"
            size="medium"
            onClick={() => {}}
          />
        }
        centerNode={<h1 className="text-heading-1">마이페이지</h1>}
        rightNode={
          <Icon
            className="cursor-pointer"
            name="BellOutline"
            size="medium"
            onClick={() => {}}
          />
        }
      />
      <Profile
        profileImageUrl={userInfo?.profileUrl}
        name={userInfo?.nickname}
      />
      <div className="rounded-t-[20px] overflow-hidden px-5 py-6 -mt-6 z-1000 bg-white">
        ㅗㅜㅑ
      </div>
    </div>
  );
}

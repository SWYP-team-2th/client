import { useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useGetNotificationPresent } from '@/api/useGetNotificationPresent';
import useGetUserInfo from '@/api/useGetUserInfo';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import MyVoteList from '@/components/user/MyVoteList';
import ParticipatedVoteList from '@/components/user/ParticipatedVoteList/ParticipatedVoteList';
import Profile from '@/components/user/Profile';
import { cn } from '@/utils/cn';

export default function UserPage() {
  const { userId } = useParams();
  const { data: userInfo } = useGetUserInfo(Number(userId));
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: notificationPresent } = useGetNotificationPresent();

  const currentTab = (searchParams.get('tab') as 'MY' | 'PARTICIPATED') || 'MY';

  const handleTabChange = (newTab: 'MY' | 'PARTICIPATED') => {
    setSearchParams({ tab: newTab });
  };

  useEffect(() => {
    if (!searchParams.get('tab')) {
      setSearchParams({ tab: 'MY' });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="h-[calc(100vh-86px)] w-full flex flex-col pt-15">
      <Header
        className="text-white bg-primary-500"
        leftNode={
          <Icon
            className="cursor-pointer"
            strokeColor="white"
            name="ArrowLeft"
            size="medium"
            onClick={() => navigate('/')}
          />
        }
        centerNode={<h1 className="text-heading-1">마이페이지</h1>}
        rightNode={
          <Icon
            className="cursor-pointer"
            name={
              notificationPresent?.present ? 'BellOutlinePoint' : 'BellOutline'
            }
            size="medium"
            onClick={() => navigate('/notifications')}
          />
        }
      />
      <Profile
        profileImageUrl={userInfo?.profileImageUrl}
        name={userInfo?.nickname}
      />
      <div className="flex-1 rounded-t-[20px] overflow-hidden px-5 py-6 -mt-6 bg-white shadow-[0_-5px_30px_0_rgba(0,0,0,0.10),0_-22px_22px_0_rgba(0,0,0,0.09),0_-5px_12px_0_rgba(0,0,0,0.10)]">
        <div className="flex gap-[18px] mb-6 text-headline-1">
          <button
            onClick={() => handleTabChange('MY')}
            className={cn(
              'font-bold pb-[2px] relative text-gray-500',
              currentTab === 'MY' && 'text-gray-900',
            )}
          >
            내 투표
            {currentTab === 'MY' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></div>
            )}
          </button>
          <button
            onClick={() => handleTabChange('PARTICIPATED')}
            className={cn(
              'font-bold pb-[2px] relative text-gray-500',
              currentTab === 'PARTICIPATED' && 'text-gray-900',
            )}
          >
            참여한 투표
            {currentTab === 'PARTICIPATED' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900"></div>
            )}
          </button>
        </div>
        <div>
          {currentTab === 'MY' && <MyVoteList />}
          {currentTab === 'PARTICIPATED' && <ParticipatedVoteList />}
        </div>
      </div>
    </div>
  );
}

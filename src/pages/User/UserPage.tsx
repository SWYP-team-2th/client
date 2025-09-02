import { useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import useGetUserInfo from '@/api/useGetUserInfo';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import MyVoteList from '@/components/user/MyVoteList';
import Profile from '@/components/user/Profile';
import { cn } from '@/utils/cn';

export default function UserPage() {
  const { userId } = useParams();
  const { data: userInfo } = useGetUserInfo(Number(userId));
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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
    <div className="h-full w-full min-h-lvh pt-15">
      <Header
        className="text-white bg-primary-500"
        leftNode={
          <Icon
            className="cursor-pointer"
            strokeColor="white"
            name="ArrowLeft"
            size="medium"
            onClick={() => navigate(-1)}
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
      <div className="rounded-t-[20px] overflow-hidden px-5 py-6 -mt-6 bg-white">
        <div className="flex gap-6 mb-6 text-heading-2">
          <button
            onClick={() => handleTabChange('MY')}
            className={cn(
              'font-bold pb-2 relative text-gray-500',
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
              'font-bold pb-2 relative text-gray-500',
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
          {currentTab === 'PARTICIPATED' && (
            <div>
              <p className="text-gray-600">
                참여한 투표 목록이 여기에 표시됩니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

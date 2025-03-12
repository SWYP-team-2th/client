import { Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetMyInfo from '@/api/useGetMyInfo';
import Logo from '@/assets/icons/logo.svg?react';
import { Button } from '@/components/common/Button/Button';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import Loading from '@/components/common/Loading';
import Profile from '@/components/my/Profile';
import VoteList from '@/components/my/Profile/VoteList';

export default function MyPage() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { data: myInfo } = useGetMyInfo();

  const handleClickCreateVoteButton = () => {
    navigate('/votes/regist');
  };

  const handleClickSettingsButton = () => {
    navigate('/settings');
  };

  return (
    <div className="w-full h-full overflow-hidden bg-gray-200">
      <Header
        leftNode={
          <Logo
            style={{ width: 50, cursor: 'pointer' }}
            onClick={() => navigate('/home')}
          />
        }
        rightNode={
          <Icon
            name="SettingsOutline"
            size="medium"
            onClick={handleClickSettingsButton}
          />
        }
      />
      <div className="pt-[75px]  w-full h-full flex flex-col flex-1 min-h-0">
        <div className="px-6">
          <Suspense fallback={<Loading />}>
            <Profile />
          </Suspense>
          {Number(userId) === myInfo?.id && (
            <Button
              buttonType="tertiary"
              size="jumbo"
              variant="solid"
              className="flex-shrink-0 mt-6 mb-7"
              onClick={handleClickCreateVoteButton}
            >
              <div className="flex gap-1 items-center text-body-1-normal">
                <Icon name="Post" size="small" />
                <p>새 투표 만들기</p>
              </div>
            </Button>
          )}
        </div>
        <VoteList />
      </div>
    </div>
  );
}

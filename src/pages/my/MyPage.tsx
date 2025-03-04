import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/assets/icons/logo.svg?react';
import { Button } from '@/components/common/Button/Button';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import Loading from '@/components/common/Loading';
import Profile from '@/components/my/Profile';
import VoteList from '@/components/my/Profile/VoteList';

export default function MyPage() {
  const navigate = useNavigate();

  const handleClickCreateVoteButton = () => {
    navigate('/votes/regist');
  };

  const handleClickSettingsButton = () => {
    navigate('/settings');
  };

  return (
    <div className="w-full h-full overflow-hidden bg-gray-200">
      <Header
        leftNode={<Logo style={{ width: 70 }} />}
        rightNode={
          <Icon
            name="SettingsOutline"
            size="medium"
            onClick={handleClickSettingsButton}
          />
        }
      />
      <div className="pt-[100px]  w-full h-full flex flex-col flex-1 min-h-0">
        <div className="px-6">
          <Suspense fallback={<Loading />}>
            <Profile />
          </Suspense>
          <Button
            buttonType="primary"
            size="large"
            variant="solid"
            className="flex-shrink-0 mt-6 mb-7"
            onClick={handleClickCreateVoteButton}
          >
            <div className="flex gap-1">
              <Icon name="Post" size="medium" />
              <p>새 투표 만들기</p>
            </div>
          </Button>
        </div>
        <VoteList />
      </div>
    </div>
  );
}

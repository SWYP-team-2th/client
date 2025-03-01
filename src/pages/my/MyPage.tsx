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
    <div className="w-full h-full overflow-hidden">
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
      <div className="pt-[105px] px-6 w-full h-full flex flex-col gap-[30px]">
        <Suspense fallback={<Loading className="h-[100px]" />}>
          <Profile />
        </Suspense>
        <Button
          buttonType="primary"
          size="large"
          variant="solid"
          className="flex-shrink-0"
          onClick={handleClickCreateVoteButton}
        >
          <div className="flex gap-1">
            <Icon name="Post" size="medium" />
            <p>새 투표 만들기</p>
          </div>
        </Button>
        <VoteList />
      </div>
    </div>
  );
}

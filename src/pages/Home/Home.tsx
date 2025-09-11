import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetMyInfo from '@/api/useGetMyInfo';
import Logo from '@/assets/icons/logo.svg?react';
import CoachMark from '@/components/coach-mark/CoachMark';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import HomeFeed from '@/components/home/HomeFeed';

export default function Home() {
  const navigate = useNavigate();
  const { data: myInfo, isLoading: isMyInfoLoading } = useGetMyInfo();

  const [showCoachMark, setShowCoachMark] = useState(true);

  const handleCloseCoachMark = () => {
    setShowCoachMark(false);
  };

  useEffect(() => {
    // 로그인 하지 않은 사용자는 온보딩으로 리다이렉트
    if (!myInfo?.id && !isMyInfoLoading) {
      navigate('/onboarding', { replace: true });
    }
  }, [myInfo, myInfo, isMyInfoLoading]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        className="bg-gray-100"
        leftNode={
          <Logo
            style={{ width: 80, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
        }
        rightNode={
          <Icon className="cursor-pointer" name="BellOutline" size="medium" />
        }
      />

      {/* 메인 콘텐츠 */}
      <div className="pt-20 pb-4 px-5 ">
        <div className="flex flex-col gap-2">
          <span className="text-title-3">오늘의 Chooz 📸</span>
          <span className="text-headline-1 text-gray-700">
            지금 가장 핫한 사진 투표, 당신의 선택은?
          </span>
        </div>
        <HomeFeed />
      </div>

      {showCoachMark && <CoachMark onClose={handleCloseCoachMark} />}
    </div>
  );
}

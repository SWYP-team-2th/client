import { useEffect } from 'react';
import Icon from '../common/Icon';
import CoachDownArrow from '@/assets/images/coach-mark/CoachDownArrow.png';
import CoachFinger from '@/assets/images/coach-mark/CoachFinger.png';
import CoachLeftArrow from '@/assets/images/coach-mark/CoachLeftArrow.png';
import CoachRightArrow from '@/assets/images/coach-mark/CoachRightArrow.png';

interface CoachMarkProps {
  onClose: () => void;
}

export default function CoachMark({ onClose }: CoachMarkProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-40 w-full max-w-[480px] h-[100dvh]">
      <div className="absolute inset-0 bg-black/70 z-40" />

      {/* X 버튼 */}
      <button
        onClick={onClose}
        className="absolute top-12 right-4 z-50 w-13 h-13 rounded-full flex items-center justify-center bg-gray-600"
        aria-label="닫기"
      >
        <Icon name="Cross" size="xxLarge" className="text-white" />
      </button>

      {/* 스크롤 가이드 */}
      <div className="absolute top-50 left-12 flex items-start gap-[18px] z-50">
        <div className="flex flex-col items-center">
          <img src={CoachFinger} alt="손가락" className="w-10" />
          <img src={CoachDownArrow} alt="아래 화살표" className="h-[180px]" />
        </div>
        <div className="mt-2 text-sm font-medium leading-relaxed">
          <p className="text-gray-100">아래로 스크롤하며</p>
          <p className="text-accent-500">지금 인기 있는 투표를</p>
          <p className="text-gray-100">둘러보세요.</p>
        </div>
      </div>

      {/* 중앙 FAB 버튼 */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-50">
        <div className="w-17 h-17 rounded-full bg-primary-500 border-6 border-gray-600 flex items-center justify-center shadow-[0px_4px_10px_rgba(106,53,240,0.40)]">
          <Icon name="PostWhite" size="large" className="text-white" />
        </div>
      </div>

      {/* 투표 만들기 가이드 */}
      <div className="absolute bottom-18 left-[38%] -translate-x-1/2 flex items-center z-50 flex-col">
        <div className="mb-2">
          <p className="text-sm font-medium text-white leading-relaxed text-center">
            <span className="font-bold">나만의 투표</span>를 만들고 <br />
            투표받아보세요.
          </p>
        </div>
        <div className="ml-2 mb-1">
          <img src={CoachRightArrow} alt="오른쪽 화살표" className="w-6" />
        </div>
      </div>

      {/* 프로필 버튼 */}
      <div className="absolute bottom-8 right-17 z-50">
        <div className="w-13 h-13 rounded-full bg-white border-6 border-gray-600 flex items-center justify-center shadow-md">
          <Icon name="User2Outline" size="large" className="text-black" />
        </div>
      </div>

      {/* 내 투표 활동 가이드 */}
      <div className="absolute bottom-20 right-9 flex z-50 flex-col">
        <div className="mb-2 text-white leading-relaxed text-sm text-end">
          <p>
            <span className="font-bold">내 투표 활동</span>은 여기서
            <br /> 확인해보세요.
          </p>
        </div>
        <div className="mb-1 flex justify-end">
          <img src={CoachLeftArrow} alt="왼쪽 화살표" className="w-6 mr-2" />
        </div>
      </div>
    </div>
  );
}

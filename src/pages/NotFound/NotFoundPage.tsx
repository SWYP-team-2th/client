import { useNavigate } from 'react-router-dom';
import Logo from '@/assets/icons/logo.svg?react';
import NotFoundImage from '@/assets/images/not-found.png';
import { Button } from '@/components/common/Button/Button';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleClickBackButton = () => {
    navigate(-1);
  };

  const handleClickGoToHomeButton = () => {
    navigate('/');
  };

  return (
    <div className="relative w-full h-[100dvh]">
      <Header
        leftNode={
          <Icon
            name="ArrowLeft"
            size="medium"
            onClick={handleClickBackButton}
          />
        }
        centerNode={<Logo style={{ width: 70 }} />}
        rightNode={<Icon name="UserOutline" size="medium" />}
      />
      <div className="flex gap-[55px] w-full flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <img src={NotFoundImage} alt="not-found" width={200} height={200} />
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="text-h3">투표 용지가 잘못되었습니다!</p>
          <p className="text-title-x-small">
            선택한 페이지가 없거나 삭제되었어요.
          </p>
        </div>
      </div>
      <Button
        buttonType="primary"
        size="large"
        variant="solid"
        className="fixed bottom-16 left-1/2 -translate-x-1/2"
        onClick={handleClickGoToHomeButton}
      >
        홈으로 가기
      </Button>
    </div>
  );
}

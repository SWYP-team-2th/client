import { useNavigate } from 'react-router-dom';
import useGetMyInfo from '@/api/useGetMyInfo';
import NotFoundImage from '@/assets/images/not-found.png';
import { Button } from '@/components/common/Button/Button';
import { getAccessToken } from '@/components/login/Auth/token';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const { data: myInfo } = useGetMyInfo({
    enabled: !!accessToken,
  });

  const handleClickGoToHomeButton = () => {
    if (myInfo?.id) {
      navigate(`/`);
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="flex flex-col w-full h-[100dvh]">
      <div className="flex-1 flex gap-[55px] w-full flex-col items-center justify-center pt-20">
        <img src={NotFoundImage} alt="not-found" width={156} height={174} />
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="text-title-2">앗! 페이지를 찾을 수 없어요.</p>
          <p className="text-headline-2 text-gray-600">
            주소가 잘못되었거나 페이지가 삭제되었어요.
          </p>
        </div>
      </div>
      <div className="px-6 pb-10">
        <Button
          buttonType="primary"
          size="large"
          variant="solid"
          className="w-full"
          onClick={handleClickGoToHomeButton}
        >
          홈으로 가기
        </Button>
      </div>
    </div>
  );
}

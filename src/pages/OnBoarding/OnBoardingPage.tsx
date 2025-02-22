import { Button } from '@/components/common/Button/Button';

export default function OnBoardingPage() {
  return (
    <div className="flex justify-center w-full h-screen px-7 flex-col">
      <div className="flex-1 flex items-center flex-col text-center">
        <span className="flex items-center text-h1">
          이 사진이 좋을까
          <br />저 사진이 좋을까?
        </span>

        <span className="flex items-center text-title-medium mt-5">
          혼자 고민하지 말고,
          <br />
          뽀토픽에게 맡겨보세요!
        </span>
      </div>
      <div className="mb-16">
        <Button buttonType="primary" variant="solid" size="large">
          카카오로 로그인하기
        </Button>
      </div>
    </div>
  );
}

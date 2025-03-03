import useLoginDialog from './hooks';
import { Button } from '../Button/Button';
import Dialog from '@/components/common/Dialog';
import Loading from '@/components/common/Loading';

export default function LoginDialog() {
  const { handleKakaoLogin, handleGuestLogin, isGuestLoginPending } =
    useLoginDialog();

  return (
    <Dialog
      title={
        <p>
          당신의 선택은?
          <br />
          로그인하고 투표에 참여하세요!
        </p>
      }
      description="카카오로 로그인 하고, 뽀또픽의 모든 기능을 이용해 보세요!"
      hasCloseButton
      customButtonProps={
        <div className="flex flex-col gap-2 w-full">
          <Button
            buttonType={isGuestLoginPending ? 'disabled' : 'primary'}
            size="large"
            variant="solid"
            onClick={handleKakaoLogin}
          >
            {isGuestLoginPending ? <Loading /> : '카카오로 시작하기'}
          </Button>
          <Button
            buttonType={isGuestLoginPending ? 'disabled' : 'primary'}
            size="large"
            variant="outline"
            onClick={handleGuestLogin}
          >
            {isGuestLoginPending ? <Loading /> : '게스트로 시작하기'}
          </Button>
        </div>
      }
      showLaterButton={false}
      inlineMessage="게스트로 계정은 위치가 바뀌거나, 일정기간이 지나면 사라져요!"
    />
  );
}

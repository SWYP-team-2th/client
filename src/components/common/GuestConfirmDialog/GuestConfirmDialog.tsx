import Dialog from '../Dialog';
import useKakaoLogin from '@/hooks/useKakaoLogin';

interface GuestConfirmDialogProps {
  title: React.ReactNode;
}

export default function GuestConfirmDialog({ title }: GuestConfirmDialogProps) {
  const { handleKakaoLogin } = useKakaoLogin();

  return (
    <Dialog
      title={title}
      description="카카오로 로그인하고 뽀또가 되어주세요!"
      confirmButtonProps={{
        text: '카카오로 계속하기',
        onClick: handleKakaoLogin,
      }}
      showLaterButton={true}
    />
  );
}

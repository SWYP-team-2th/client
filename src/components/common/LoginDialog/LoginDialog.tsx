import Dialog from '../Dialog';
import useLoginDialog from './hooks';

export default function LoginDialog() {
  const { handleLogin } = useLoginDialog();

  return (
    <Dialog
      title={
        <>
          당신의 선택은?
          <br />
          로그인하고 투표에 참여하세요!
        </>
      }
      description="로그인하고 나만의 투표를 만들고 공유하세요."
      confirmButtonProps={{
        text: '카카오로 계속하기',
        onClick: () => {
          console.log('hi');
          handleLogin();
        },
      }}
      showLaterButton={true}
    />
  );
}

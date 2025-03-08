import { Button } from '@/components/common/Button/Button';

export default function LoginButton() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${window.location.origin}/oauth`;
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Button
      onClick={handleLogin}
      buttonType="primary"
      variant="solid"
      size="large"
    >
      카카오로 로그인하기
    </Button>
  );
}

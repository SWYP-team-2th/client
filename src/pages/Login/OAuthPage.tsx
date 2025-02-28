import { useEffect } from 'react';
import usePostKakaoLogin from '@/api/usePostKaKaoLogin';

export default function OAuthPage() {
  const { mutate } = usePostKakaoLogin();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      mutate({
        redirectUri: `${window.location.origin}/oauth`,
        code,
      });
    }
  }, []);

  return <div>로그인 진행중임다.</div>;
}

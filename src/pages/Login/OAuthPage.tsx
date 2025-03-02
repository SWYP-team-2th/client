import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usePostKakaoLogin from '@/api/usePostKaKaoLogin';
import { setAccessToken } from '@/components/login/Auth/token';

export default function OAuthPage() {
  const state = new URL(window.location.href).searchParams.get('state');
  const navigate = useNavigate();
  const { mutate } = usePostKakaoLogin({
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      navigate(state ?? `/user/${data.userId}`);
    },
  });

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

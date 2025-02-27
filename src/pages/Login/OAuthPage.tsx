import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usePostKakaoLogin from '@/api/usePostKaKaoLogin';

export default function OAuthPage() {
  const navigate = useNavigate();
  const { mutate } = usePostKakaoLogin();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      mutate(
        {
          redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
          code,
        },
        {
          onSuccess: (data) => {
            console.log('로그인 성공, 토큰:', data.accessToken);
            navigate(`${window.location.origin}/oauth`);
          },
          onError: (err) => {
            console.error('로그인 실패:', err);
            navigate('/');
          },
        },
      );
    }
  }, []);

  return <div>로그인 진행중임다.</div>;
}

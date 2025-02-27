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
          redirectUri: `${window.location.origin}/oauth`,
          code,
        },
        {
          onSuccess: (data) => {
            console.log('로그인 성공, 토큰:', data.accessToken);
            // 추후 onboarding -> 마이페이지 userId 포함해서 수정 예정
            navigate('/onboarding');
          },
          onError: (err) => {
            console.error('로그인 실패:', err);
            navigate('/onboarding');
          },
        },
      );
    }
  }, []);

  return <div>로그인 진행중임다.</div>;
}

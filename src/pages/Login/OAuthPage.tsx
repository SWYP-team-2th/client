import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetIdentificationInfo from '@/api/useGetIdentificationInfo';
import usePostKakaoLogin from '@/api/usePostKaKaoLogin';

export default function OAuthPage() {
  const navigate = useNavigate();
  const { mutate } = usePostKakaoLogin();
  const { data: userInfo, refetch } = useGetIdentificationInfo();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      mutate(
        {
          redirectUri: `${window.location.origin}/oauth`,
          code,
        },
        {
          onSuccess: () => {
            refetch();
          },
          onError: (err) => {
            console.error('로그인 실패:', err);
            navigate('/onboarding');
          },
        },
      );
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      console.log('유저 정보 조회 성공:', userInfo);
      navigate(`/user/${userInfo.id}`);
    }
  }, [userInfo]);

  return <div>로그인 진행중임다.</div>;
}

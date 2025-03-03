import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePostKakaoLogin from '@/api/usePostKaKaoLogin';
import { setAccessToken, setRole } from '@/components/login/Auth/token';
import Loading from '@/components/common/Loading';

export default function OAuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const state = new URL(window.location.href).searchParams.get('state');
  const navigate = useNavigate();
  const { mutate } = usePostKakaoLogin({
    onSuccess: (data) => {
      setRole(data.role);
      setAccessToken(data.accessToken);
      navigate(state ?? `/user/${data.userId}`);
    },
  });

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      mutate(
        {
          redirectUri: `${window.location.origin}/oauth`,
          code,
        },
        {
          onSettled: () => setIsLoading(false),
        },
      );
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center fixed inset-0">
        <Loading />
      </div>
    );
  }

  return null;
}

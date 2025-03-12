import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usePostKakaoLogin from '@/api/usePostKaKaoLogin';
import Loading from '@/components/common/Loading';
import { setAccessToken, setRole } from '@/components/login/Auth/token';

export default function OAuthPage() {
  const navigate = useNavigate();

  const { mutate, isPending } = usePostKakaoLogin({
    onSuccess: (data) => {
      setRole(data.role);
      setAccessToken(data.accessToken);
      navigate(`/`);
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

  if (isPending) {
    return (
      <div className="flex items-center justify-center fixed inset-0">
        <Loading className="w-30 h-30" />
      </div>
    );
  }

  return null;
}

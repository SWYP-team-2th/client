import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { request } from '@/api/config';
import { setAccessToken } from '@/components/login/Auth/token';

interface LoginResponseType {
  accessToken: string;
  userId: number;
}

interface LoginRequestType {
  code: string;
  redirectUri: string;
}

export default function usePostKakaoLogin() {
  const navigate = useNavigate();

  return useMutation<LoginResponseType, Error, LoginRequestType>({
    mutationFn: async (data) => {
      return request<LoginResponseType>({
        method: 'POST',
        url: '/auth/oauth2/code/kakao',
        data,
      });
    },
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      navigate(`/user/${data.userId}`);
    },
    onError: (err) => {
      console.error('로그인 실패:', err);
      navigate('/onboarding');
    },
  });
}

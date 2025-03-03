import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { request } from '@/api/config';

interface LoginResponseType {
  accessToken: string;
  userId: number;
  role: 'USER' | 'GUEST';
}

interface LoginRequestType {
  code: string;
  redirectUri: string;
}

export default function usePostKakaoLogin(
  options?: UseMutationOptions<LoginResponseType, Error, LoginRequestType>,
) {
  const navigate = useNavigate();

  return useMutation<LoginResponseType, Error, LoginRequestType>({
    mutationFn: async (data) => {
      return request<LoginResponseType>({
        method: 'POST',
        url: '/auth/oauth2/code/kakao',
        data,
      });
    },
    onError: (err) => {
      console.error('로그인 실패:', err);
      navigate('/onboarding');
    },
    ...options,
  });
}

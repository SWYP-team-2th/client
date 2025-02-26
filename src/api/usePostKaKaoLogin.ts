import { useMutation } from '@tanstack/react-query';
import { request } from '@/api/config';
import { setAccessToken } from '@/components/login/Auth/token';

interface LoginResponseType {
  accessToken: string;
}

interface LoginRequestType {
  code: string;
  redirectUri: string;
}

export default function usePostKakaoLogin() {
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
    },
  });
}

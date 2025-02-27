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
      console.log('API 요청 데이터:', data);
      return request<LoginResponseType>({
        method: 'POST',
        url: '/auth/oauth2/code/kakao',
        data,
      });
    },
    onSuccess: (data) => {
      console.log('로그인 성공, 토큰:', data.accessToken);
      setAccessToken(data.accessToken);
    },
    onError: (err) => {
      console.error('로그인 실패:', err);
    },
  });
}

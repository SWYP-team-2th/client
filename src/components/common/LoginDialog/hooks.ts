import { getIsDevelopment } from '@/utils/cn/getEnvironment';

export default function useLoginDialog() {
  const isDevelopment = getIsDevelopment();
  const pathname = window.location.pathname;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${isDevelopment ? import.meta.env.VITE_KAKAO_CLIENT_ID : import.meta.env.VITE_KAKAO_PROD_CLIENT_ID}&redirect_uri=${window.location.origin}/oauth&state=${pathname}`;
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return {
    handleLogin,
  };
}

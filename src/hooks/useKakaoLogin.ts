export default function useKakaoLogin() {
  const pathname = window.location.pathname;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${window.location.origin}/oauth&state=${pathname}`;
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return {
    handleKakaoLogin,
  };
}

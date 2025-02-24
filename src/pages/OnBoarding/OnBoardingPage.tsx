import { Button } from '@/components/common/Button/Button';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OnBoardingPage() {
  const navigate = useNavigate();

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    console.log('인가 코드:', code);

    if (code) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/oauth2/code/kakao`, {
          redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
          code,
        })
        .then((res) => {
          navigate('/onboarding');
          console.log(res, '로그인 O');
        })
        .catch((err) => {
          navigate('/');
          console.log(err, '로그인 X');
        });
    }
  }, [navigate]);

  return (
    <div className="flex justify-center w-full h-screen px-7 flex-col">
      <div className="flex-1 flex items-center flex-col text-center">
        <span className="flex items-center text-h1">
          이 사진이 좋을까
          <br />저 사진이 좋을까?
        </span>

        <span className="flex items-center text-title-medium mt-5">
          혼자 고민하지 말고,
          <br />
          뽀토픽에게 맡겨보세요!
        </span>
      </div>
      <div className="mb-16">
        <Button
          onClick={handleLogin}
          buttonType="primary"
          variant="solid"
          size="large"
        >
          카카오로 로그인하기
        </Button>
      </div>
    </div>
  );
}

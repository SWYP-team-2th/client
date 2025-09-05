import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetMyInfo from '@/api/useGetMyInfo';
import onboardingImage from '@/assets/images/onboarding/onboarding.png';
import splashImage from '@/assets/images/splash/Splash.png';
import LoginButton from '@/components/login/button/LoginButton';

export default function OnBoardingPage() {
  const navigate = useNavigate();
  const { data: myInfo } = useGetMyInfo();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (myInfo?.id) {
      navigate('/', { replace: true });
    }
  }, [myInfo, navigate]);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2500);
  }, []);

  if (showSplash) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <img
          src={splashImage}
          alt="Splash"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-12">
        <img
          src={onboardingImage}
          alt="Onboarding"
          className="w-full max-h-[60vh] object-contain "
        />

        <div className="text-center mb-12">
          <h2 className="text-title-1 mb-3">
            고민되는 순간,
            <br />
            투표로 결정해봐요!
          </h2>
          <p className="text-headline-2 text-gray-700">
            올리고, 투표받고,
            <br />
            함께 고르는 재미까지!
          </p>
        </div>
      </div>

      <div className="px-6 pb-8 flex-shrink-0">
        <LoginButton />
      </div>
    </div>
  );
}

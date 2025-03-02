import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetMyInfo from '@/api/useGetMyInfo';
import Loading from '@/components/common/Loading';
import { getAccessToken } from '@/components/login/Auth/token';

function App() {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const {
    data: myInfo,
    isLoading: isMyInfoLoading,
    isSuccess: isMyInfoSuccess,
  } = useGetMyInfo({
    enabled: !!accessToken,
  });

  useEffect(() => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      navigate('/onboarding', { replace: true });
      return;
    }

    if (myInfo && isMyInfoSuccess) {
      navigate(`/user/${myInfo.id}`, { replace: true });
    }
  }, [navigate, myInfo, isMyInfoSuccess]);

  return (
    <div className="w-full max-w-[480px] mx-auto my-0 h-[100dvh] flex items-center justify-center">
      {isMyInfoLoading && <Loading />}
    </div>
  );
}

export default App;

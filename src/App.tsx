import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetMyInfo from '@/api/useGetMyInfo';
import Loading from '@/components/common/Loading';

function App() {
  const navigate = useNavigate();
  const {
    data: myInfo,
    isLoading: isMyInfoLoading,
    isSuccess: isMyInfoSuccess,
  } = useGetMyInfo();

  useEffect(() => {
    if (isMyInfoLoading) {
      return;
    }

    if (myInfo && isMyInfoSuccess) {
      navigate(`/user/${myInfo.id}`, { replace: true });
      return;
    }

    navigate('/onboarding', { replace: true });
  }, [myInfo, isMyInfoSuccess, isMyInfoLoading]);

  return (
    <div className="w-full max-w-[480px] mx-auto my-0 h-[100dvh] flex items-center justify-center">
      {isMyInfoLoading && <Loading />}
    </div>
  );
}

export default App;

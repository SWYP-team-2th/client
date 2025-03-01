import { useNavigate, Outlet } from 'react-router-dom';
import { FloatingButton } from '@/components/common/Button/FloatingButton';
import Icon from '@/components/common/Icon';

export default function DefaultLayout() {
  const navigate = useNavigate();

  const handleClickFloatingButton = () => {
    navigate('/votes/regist');
  };

  return (
    <div className="relative w-full h-full mx-auto my-0 min-h-lvh max-w-[480px]">
      <Outlet />
      <FloatingButton
        onClick={handleClickFloatingButton}
        className="absolute bottom-25 right-6 z-50"
        buttonType="secondary"
        size="large"
      >
        <Icon name="PlusWhite" size="large" />
      </FloatingButton>
    </div>
  );
}

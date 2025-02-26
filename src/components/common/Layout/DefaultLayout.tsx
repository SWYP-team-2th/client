import { useNavigate, Outlet } from 'react-router-dom';
import { FloatingButton } from '@/components/common/Button/FloatingButton';
import Icon from '@/components/common/Icon';

export default function DefaultLayout() {
  const navigate = useNavigate();

  const handleClickFloatingButton = () => {
    navigate('/votes/regist');
  };

  return (
    <div className="w-full h-full mx-auto my-0 min-h-lvh desktop:w-[480px] relative">
      <Outlet />

      <div className="fixed bottom-[12vh] desktop:right-[calc(50%-216px)] z-50">
        <FloatingButton
          onClick={handleClickFloatingButton}
          buttonType="secondary"
          size="large"
        >
          <Icon name="PlusWhite" size="large" />
        </FloatingButton>
      </div>
    </div>
  );
}

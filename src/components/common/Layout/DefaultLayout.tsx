import { useNavigate, Outlet } from 'react-router-dom';
import useGetMyInfo from '@/api/useGetMyInfo';
import { FloatingButton } from '@/components/common/Button/FloatingButton';
import { useDialog } from '@/components/common/Dialog/hooks';
import Icon from '@/components/common/Icon';
import LoginDialog from '@/components/common/LoginDialog/LoginDialog';

export default function DefaultLayout() {
  const navigate = useNavigate();
  const { openDialog } = useDialog();
  const { data: myInfo } = useGetMyInfo();

  const handleClickFloatingButton = () => {
    if (!myInfo) {
      openDialog(<LoginDialog />);
      return;
    }

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

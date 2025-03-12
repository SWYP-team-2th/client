import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutDialog from './LogoutDialog';
import { useDialog } from '../common/Dialog/hooks';
import Icon from '../common/Icon';
import Switch from '../common/Switch';
import useToast from '../common/Toast/hooks';

interface MenuType {
  id: string;
  title: string;
  subMenus: SubMenuType[];
}

interface SubMenuType {
  id: string;
  title: string;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
}

export default function useSettingMenus() {
  const toast = useToast();
  const { openDialog } = useDialog();
  const navigate = useNavigate();

  const handleClickNotOpenedMenu = () => {
    toast.info({
      title: '추가 예정인 기능이에요!',
    });
  };

  const handleClickLogoutButton = () => {
    openDialog(<LogoutDialog />);
  };

  const handleClickServiceOfTermsButton = () => {
    navigate('/terms');
  };

  const handleClickPrivacyPolicyButton = () => {
    navigate('/privacy-policy');
  };

  const menus: MenuType[] = useMemo(
    () => [
      {
        id: 'accounts',
        title: '계정',
        subMenus: [
          {
            id: 'my-information',
            title: '내 정보',
            rightIcon: <Icon name="ArrowRight" size="medium" />,
            onClick: handleClickNotOpenedMenu,
          },
          {
            id: 'logout',
            title: '로그아웃',
            rightIcon: <Icon name="Logout" size="medium" />,
            onClick: handleClickLogoutButton,
          },
        ],
      },
      {
        id: 'notifications',
        title: '알림',
        subMenus: [
          {
            id: 'app-notification',
            title: '앱 알림 설정',
            rightIcon: (
              <Switch
                size="small"
                checked={false}
                onChange={handleClickNotOpenedMenu}
              />
            ),
          },
        ],
      },
      {
        id: 'app-information',
        title: '앱 정보',
        subMenus: [
          {
            id: 'terms-of-service',
            title: '이용 약관',
            rightIcon: <Icon name="ArrowRight" size="medium" />,
            onClick: handleClickServiceOfTermsButton,
          },
          {
            id: 'privacy-policy',
            title: '개인정보 처리 방침',
            rightIcon: <Icon name="ArrowRight" size="medium" />,
            onClick: handleClickPrivacyPolicyButton,
          },
        ],
      },
    ],
    [],
  );

  return { menus };
}

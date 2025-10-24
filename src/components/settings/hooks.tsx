import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LogoutDialog from './LogoutDialog';
import { useDialog } from '../common/Dialog/hooks';
import Icon from '../common/Icon';

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
  const { userId } = useParams();
  const { openDialog } = useDialog();
  const navigate = useNavigate();

  const handleClickMyProfileButton = () => {
    navigate(`/user/${userId}/settings/profile`);
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
            rightIcon: <Icon name="ArrowRightGray" size="medium" />,
            onClick: handleClickMyProfileButton,
          },
          {
            id: 'logout',
            title: '로그아웃',
            rightIcon: <Icon name="LogoutGray" size="medium" />,
            onClick: handleClickLogoutButton,
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
            rightIcon: <Icon name="ArrowRightGray" size="medium" />,
            onClick: handleClickServiceOfTermsButton,
          },
          {
            id: 'privacy-policy',
            title: '개인정보 처리 방침',
            rightIcon: <Icon name="ArrowRightGray" size="medium" />,
            onClick: handleClickPrivacyPolicyButton,
          },
        ],
      },
    ],
    [],
  );

  return { menus };
}

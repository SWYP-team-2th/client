import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LogoutDialog from './LogoutDialog';
import WithDrawalDialog from './WithDrawalDialog';
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

  const handleClickWithdrawalButton = () => {
    openDialog(<WithDrawalDialog />);
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
      {
        id: 'account-security',
        title: '계정/보안',
        subMenus: [
          {
            id: 'logout',
            title: '로그아웃',
            onClick: handleClickLogoutButton,
          },
          {
            id: 'withdrawal',
            title: '회원탈퇴',
            onClick: handleClickWithdrawalButton,
          },
        ],
      },
    ],
    [],
  );

  return { menus };
}

import { useMemo } from 'react';
import useGetMyInfo from '@/api/useGetMyInfo';
import Icon from '@/components/common/Icon';

export default function useBottomNavigation() {
  const { data: userInfo } = useGetMyInfo();

  const getNavigationMenus = useMemo(() => {
    return [
      {
        id: 1,
        name: '홈',
        icon: <Icon name="HomeOutline" size="large" />,
        activeIcon: <Icon name="HomeFilled" size="large" />,
        link: '/',
      },
      {
        id: 2,
        name: '마이페이지',
        icon: <Icon name="User2Outline" size="large" />,
        activeIcon: <Icon name="User2Fill" size="large" />,
        link: `/user/${userInfo?.id}`,
      },
    ];
  }, [userInfo]);

  return {
    menus: getNavigationMenus,
  };
}

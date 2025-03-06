import { useMemo } from 'react';
import useGetMyInfo from '@/api/useGetMyInfo';
import { navigationMenus } from '@/components/common/Navigation/navigationMenus';

export default function useBottomNavigation() {
  const { data: userInfo } = useGetMyInfo();

  const getNavigationMenus = useMemo(() => {
    return navigationMenus(userInfo?.id?.toString());
  }, [userInfo?.id]);

  return {
    navigationMenus: getNavigationMenus,
  };
}

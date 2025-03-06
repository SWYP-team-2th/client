import { ReactElement } from 'react';
import Icon from '@/components/common/Icon';

export const navigationMenus = (
  userId?: string,
): {
  id: number;
  name: string;
  icon: ReactElement;
  activeIcon: ReactElement;
  link: string;
}[] => [
  {
    id: 1,
    name: '홈',
    icon: <Icon name="HomeOutline" size="large" />,
    activeIcon: <Icon name="HomeFilled" size="large" />,
    link: '/home',
  },
  {
    id: 2,
    name: '마이페이지',
    icon: <Icon name="User2Outline" size="large" />,
    activeIcon: <Icon name="User2Fill" size="large" />,
    link: `/user/${userId}`,
  },
];

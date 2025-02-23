import Logo from '@/assets/icons/logo.svg?react';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';

export default function MyPage() {
  return (
    <div>
      <Header
        leftNode={<Logo style={{ width: 70 }} />}
        rightNode={<Icon name="SettingsOutline" size="medium" />}
      />
      <div className="pt-[65px]"></div>
    </div>
  );
}

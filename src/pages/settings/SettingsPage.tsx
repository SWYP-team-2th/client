import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon';
import useSettingMenus from '@/components/settings/hooks';
import Menu from '@/components/settings/Menu';

export default function SettingsPage() {
  const navigate = useNavigate();

  const handleClickBackButton = () => {
    navigate(-1);
  };

  const { menus } = useSettingMenus();

  return (
    <div>
      <Header
        leftNode={
          <Icon
            name="ArrowLeft"
            size="medium"
            onClick={handleClickBackButton}
          />
        }
        centerNode={<h1 className="text-title-medium">설정</h1>}
      />
      <div className="pt-[55px]">
        {menus.map((menu) => (
          <Menu key={menu.id} title={menu.title}>
            {menu.subMenus.map((subMenu) => (
              <Menu.Item
                key={subMenu.id}
                title={subMenu.title}
                rightIcon={subMenu.rightIcon}
                onClick={subMenu.onClick}
              />
            ))}
          </Menu>
        ))}
      </div>
    </div>
  );
}

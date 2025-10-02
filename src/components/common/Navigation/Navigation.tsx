import { NavLink } from 'react-router-dom';
import Icon from '@/components/common/Icon';
import useBottomNavigation from '@/components/common/Navigation/hooks';

const Navigation = () => {
  const { menus } = useBottomNavigation();

  return (
    <nav className="w-full h-[86px] fixed bottom-0 desktop:w-[480px] bg-gray-100 flex justify-between items-center px-15 border-t-[0.5px] border-gray-300">
      {menus.map((menu) => (
        <NavLink key={menu.id} to={menu.link} className="flex justify-center">
          {({ isActive }) => (
            <div className="relative flex flex-col items-center cursor-pointer -translate-y-4">
              {isActive ? menu.activeIcon : menu.icon}
            </div>
          )}
        </NavLink>
      ))}

      <NavLink
        to="/votes/regist"
        className="absolute left-1/2 bottom-10 -translate-x-1/2 w-15 h-15 rounded-full bg-primary-500 flex items-center justify-center shadow-[0px_4px_10px_rgba(106,53,240,0.40)]"
      >
        <Icon name="PostWhite" size="large" className="text-white" />
      </NavLink>
    </nav>
  );
};

export default Navigation;

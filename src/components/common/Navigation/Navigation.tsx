import { NavLink } from 'react-router-dom';
import Icon from '@/components/common/Icon';
import useBottomNavigation from '@/components/common/Navigation/hooks';

const Navigation = () => {
  const { menus } = useBottomNavigation();

  return (
    <nav className="w-full h-[80px] fixed bottom-0 desktop:w-[480px] bg-gray-100 flex justify-between items-center px-10">
      {menus.map((menu) => (
        <NavLink
          key={menu.id}
          to={menu.link}
          className="w-1/4 flex justify-center"
        >
          {({ isActive }) => (
            <div className="relative flex flex-col items-center cursor-pointer">
              {isActive ? menu.activeIcon : menu.icon}
            </div>
          )}
        </NavLink>
      ))}

      <NavLink
        to="/votes/regist"
        className="absolute left-1/2 bottom-8 -translate-x-1/2 w-16 h-16 rounded-full bg-accent-500 flex items-center justify-center shadow-[0px_4px_10px_rgba(106,53,240,0.40)]"
      >
        <Icon name="PostWhite" size="large" className="text-white" />
      </NavLink>
    </nav>
  );
};

export default Navigation;

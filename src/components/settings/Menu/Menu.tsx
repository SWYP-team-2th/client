interface MenuProps {
  title: string;
  children: React.ReactNode;
}

interface MenuComponent extends React.FC<MenuProps> {
  Item: typeof MenuItem;
}

interface MenuItemProps {
  title: string;
  onClick?: () => void;
  rightIcon?: React.ReactNode;
}

const MenuItem = ({ title, onClick, rightIcon }: MenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between text-title-medium text-gray-900 cursor-pointer"
    >
      <span>{title}</span>
      {rightIcon}
    </button>
  );
};

const Menu: MenuComponent = ({ children, title }) => {
  return (
    <div className="pt-8 pb-6 px-6 flex flex-col gap-4 border-b-[5px] border-gray-300">
      {title && <h2 className="text-title-small text-gray-600">{title}</h2>}
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
};

Menu.Item = MenuItem;

export default Menu;

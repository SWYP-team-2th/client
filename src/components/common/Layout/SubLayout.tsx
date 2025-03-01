import { Outlet } from 'react-router-dom';

export default function SubLayout() {
  return (
    <div className="w-full h-lvh min-h-lvh mx-auto my-0 desktop:w-[480px]">
      <Outlet />
    </div>
  );
}

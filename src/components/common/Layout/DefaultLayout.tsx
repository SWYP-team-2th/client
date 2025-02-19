import { Outlet } from 'react-router-dom';

export default function DefaultLayout() {
  return (
    <div className="w-full h-full mx-auto my-0 min-h-lvh border-x-[1px] desktop:w-[480px]">
      <Outlet />
    </div>
  );
}

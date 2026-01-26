import { Outlet } from 'react-router-dom';
import usePageViewTracking from '@/hooks/usePageViewTracking';

export default function SubLayout() {
  usePageViewTracking();

  return (
    <div className="w-full h-lvh min-h-lvh mx-auto my-0 desktop:w-[480px]">
      <Outlet />
    </div>
  );
}

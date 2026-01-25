import { Outlet } from 'react-router-dom';
import Navigation from '@/components/common/Navigation/Navigation';
import usePageViewTracking from '@/hooks/usePageViewTracking';

export default function DefaultLayout() {
  usePageViewTracking();

  return (
    <div className="relative w-full h-full mx-auto my-0 min-h-lvh max-w-[480px]">
      <div className="pb-[80px]">
        <Outlet />
      </div>
      <Navigation />
    </div>
  );
}

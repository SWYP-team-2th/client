
import { Outlet } from 'react-router-dom';
import Navigation from '@/components/common/Navigation/Navigation';

export default function DefaultLayout() {
  return (
    <div className="relative w-full h-full mx-auto my-0 min-h-lvh max-w-[480px]">
      <Outlet />
      <Navigation />
    </div>
  );
}

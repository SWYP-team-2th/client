import { Outlet } from 'react-router-dom';
import { Header } from '@/components/common/Header/Header';

interface DefaultLayoutProps {
  headerNode?: {
    leftNode?: React.ReactNode;
    centerNode?: React.ReactNode;
    rightNode?: React.ReactNode;
  };
}

export default function DefaultLayout({ headerNode }: DefaultLayoutProps) {
  return (
    <div className="w-full h-full mx-auto my-0 min-h-lvh desktop:w-[480px]">
      {headerNode && <Header {...headerNode} />}
      <Outlet />
    </div>
  );
}

import { cn } from '@/utils/cn';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  leftNode?: React.ReactNode;
  centerNode?: React.ReactNode;
  rightNode?: React.ReactNode;
}

export function Header({
  leftNode,
  centerNode,
  rightNode,
  className,
  ...props
}: HeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between w-full max-w-[480px] py-[14px] px-5 border-b border-gray-200 fixed top-0 left-1/2 -translate-x-1/2 z-40 bg-gray-100 ',
        className,
      )}
      {...props}
    >
      <div className="w-[32px]">{leftNode}</div>
      {centerNode}
      <div className="w-[32px]">{rightNode}</div>
    </div>
  );
}

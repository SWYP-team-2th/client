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
        'flex items-center justify-between w-full max-w-[480px] py-4 px-5 border-b border-gray-400 fixed top-0 left-1/2 -translate-x-1/2 z-40 bg-gray-100',
        className,
      )}
      {...props}
    >
      {leftNode}
      {centerNode}
      {rightNode}
    </div>
  );
}

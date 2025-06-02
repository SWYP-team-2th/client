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
        'flex items-center justify-between w-full max-w-[480px] py-[18px] px-5 fixed top-0 left-1/2 -translate-x-1/2 z-40',
        className,
      )}
      {...props}
    >
      <div className="flex justify-start">{leftNode}</div>
      <div className="absolute left-1/2 -translate-x-1/2 text-heading-1">
        {centerNode}
      </div>
      <div className="flex justify-end">{rightNode}</div>
    </div>
  );
}

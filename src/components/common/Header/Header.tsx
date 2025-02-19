import { cn } from '@/utils/cn';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export function Header({
  left,
  center,
  right,
  className,
  ...props
}: HeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between w-full pt-[46px] pb-4 px-5 border-b border-gray-400',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">{left}</div>
      <div className="flex items-center gap-2">{center}</div>
      <div className="flex items-center gap-2">{right}</div>
    </div>
  );
}

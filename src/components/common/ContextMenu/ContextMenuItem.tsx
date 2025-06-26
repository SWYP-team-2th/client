import { useContextMenuContext } from './context';
import { cn } from '@/utils/cn';
interface Props {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ContextMenuItem({ icon, children, onClick, className }: Props) {
  const { setIsOpen } = useContextMenuContext();

  const handleClick = () => {
    onClick?.();
    setIsOpen(false);
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className={cn(
          'flex w-full items-center text-gray-800 text-body-1',
          className,
        )}
      >
        <span className="mr-2">{icon}</span>
        {children}
      </button>
    </li>
  );
}

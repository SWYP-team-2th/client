import { cn } from '@/utils/cn';

interface OverlayProps {
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export default function Overlay({
  children,
  onClose,
  className,
}: OverlayProps) {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 inset-y-0 inset-0 z-50 max-w-[480px] w-full h-full">
      <div
        className={cn('absolute inset-0 bg-black/50', className)}
        onClick={onClose}
      />
      {children}
    </div>
  );
}

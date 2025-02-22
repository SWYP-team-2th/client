interface OverlayProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Overlay({ children, onClose }: OverlayProps) {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 inset-y-0 inset-0 z-50 max-w-[480px] w-full h-full">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      {children}
    </div>
  );
}

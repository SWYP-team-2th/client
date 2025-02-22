interface OverlayProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export const Overlay = ({ children, onClose }: OverlayProps) => {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
};

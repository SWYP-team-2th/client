import { useContextMenuContext } from './context';

interface ContextMenuButtonProps {
  children: React.ReactNode;
}

export function ContextMenuButton({ children }: ContextMenuButtonProps) {
  const { isOpen, setIsOpen } = useContextMenuContext();

  return <button onClick={() => setIsOpen(!isOpen)}>{children}</button>;
}

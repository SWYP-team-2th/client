import { useContextMenuContext } from './context';

interface ContextMenuTriggerProps {
  children: React.ReactNode;
}

export function ContextMenuTrigger({ children }: ContextMenuTriggerProps) {
  const { isOpen, setIsOpen } = useContextMenuContext();

  return <button onClick={() => setIsOpen(!isOpen)}>{children}</button>;
}

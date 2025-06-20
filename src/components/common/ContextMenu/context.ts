import { createContext, useContext } from 'react';

interface ContextMenuContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const ContextMenuContext = createContext<
  ContextMenuContextType | undefined
>(undefined);

export function useContextMenuContext() {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error(
      'ContextMenuContext는 ContextMenu 내부에서만 사용할 수 있음',
    );
  }
  return context;
}

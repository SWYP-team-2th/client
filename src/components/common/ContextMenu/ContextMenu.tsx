import { useEffect, useRef, useState, ReactNode } from 'react';
import { ContextMenuContext } from '@/components/common/ContextMenu/context';
import { ContextMenuTrigger } from '@/components/common/ContextMenu/ContextMenuButton';
import { ContextMenuItem } from '@/components/common/ContextMenu/ContextMenuItem';
import { ContextMenuList } from '@/components/common/ContextMenu/ContextMenuList';

interface ContextMenuProps {
  children: ReactNode;
}

function ContextMenuRoot({ children }: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <ContextMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={menuRef} className="relative inline-block">
        {children}
      </div>
    </ContextMenuContext.Provider>
  );
}

const ContextMenu = Object.assign(ContextMenuRoot, {
  Trigger: ContextMenuTrigger,
  List: ContextMenuList,
  Item: ContextMenuItem,
});

export default ContextMenu;

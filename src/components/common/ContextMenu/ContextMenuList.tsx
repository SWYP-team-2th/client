import { useContextMenuContext } from './context';

export function ContextMenuList({ children }: { children: React.ReactNode }) {
  const { isOpen } = useContextMenuContext();

  if (!isOpen) return null;

  return (
    <ul className="absolute w-max bg-gray-100 right-0 mt-3 px-6 py-4 space-y-4 rounded-xl shadow-lg z-10">
      {children}
    </ul>
  );
}

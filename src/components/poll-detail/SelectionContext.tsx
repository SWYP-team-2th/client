import {
  createContext,
  useContext,
  useMemo,
  useState,
  PropsWithChildren,
} from 'react';
import { Post } from '@/types/post';

interface SelectionContextValue {
  selectedChoiceIds: number[];
  setChecked: (id: string, checked: boolean) => void;
}

const SelectionContext = createContext<SelectionContextValue | undefined>(
  undefined,
);

interface SelectionProviderProps extends PropsWithChildren {
  pollType: Post['pollOption']['pollType'];
}

export function SelectionProvider({
  pollType,
  children,
}: SelectionProviderProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const setChecked = (id: string, checked: boolean) => {
    setCheckedItems((prev) => {
      if (pollType === 'SINGLE') {
        return checked ? { [id]: true } : {};
      }
      return { ...prev, [id]: checked };
    });
  };

  const selectedChoiceIds = useMemo(() => {
    return Object.entries(checkedItems)
      .filter(([, isChecked]) => isChecked)
      .map(([id]) => parseInt(id, 10));
  }, [checkedItems]);

  const value: SelectionContextValue = {
    selectedChoiceIds,
    setChecked,
  };

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) throw new Error('에러요');
  return context;
}

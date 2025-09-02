import { createContext, useContext, useState, PropsWithChildren } from 'react';
import { Post } from '@/types/post';

interface SelectionContextValue {
  checkedItems: number[];
  setChecked: (id: number, checked: boolean) => void;
  setCheckedItems: (items: number[]) => void;
  voteMode: boolean;
  setVoteMode: (mode: boolean) => void;
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
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [voteMode, setVoteMode] = useState<boolean>(false);

  const setChecked = (id: number, checked: boolean) => {
    setCheckedItems((prev) => {
      if (pollType === 'SINGLE') {
        return checked ? [id] : [];
      }
      return checked
        ? [...prev, id]
        : prev.filter((choiceId) => choiceId !== id);
    });
  };

  const value: SelectionContextValue = {
    checkedItems,
    setChecked,
    setCheckedItems,
    voteMode,
    setVoteMode,
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

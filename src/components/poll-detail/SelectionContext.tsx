import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useEffect,
} from 'react';
import { Post } from '@/types/post';

interface SelectionContextValue {
  checkedItems: number[];
  handleVoteChoice: (id: number, checked: boolean) => void;
  setCheckedItems: (items: number[]) => void;
  voteMode: boolean;
  setVoteMode: (mode: boolean) => void;
}

const SelectionContext = createContext<SelectionContextValue | undefined>(
  undefined,
);

interface SelectionProviderProps extends PropsWithChildren {
  pollType: Post['pollOption']['pollType'];
  pollChoices: Post['pollChoices'];
  isVoted: boolean;
}

export function SelectionProvider({
  pollType,
  pollChoices,
  isVoted,
  children,
}: SelectionProviderProps) {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [voteMode, setVoteMode] = useState<boolean>(false);

  // 사용자가 선택한 투표 사진들의 id만 뽑아서 체크 상태로 복원시키기
  useEffect(() => {
    if (isVoted && !voteMode) {
      const alreadyVote = pollChoices
        .filter((choice) => choice.voteId !== null)
        .map((choice) => choice.id);
      setCheckedItems(alreadyVote);
    }
  }, [isVoted, pollChoices, voteMode]);

  const handleVoteChoice = (id: number, checked: boolean) => {
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
    handleVoteChoice,
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

import CardItem from '@/components/poll-detail/Card/CardItem';
import { useSelection } from '@/components/poll-detail/SelectionContext';
import { PollChoice } from '@/types/post';

interface CardListProps {
  pollChoices: PollChoice[];
  isVoted: boolean;
}

export default function CardList({ pollChoices, isVoted }: CardListProps) {
  const { selectedChoiceIds, setChecked } = useSelection();

  const handleCheck =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(id, e.target.checked);
    };

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-8 mx-[30px]">
      {pollChoices.map((choice) => (
        <CardItem
          key={choice.id}
          choice={choice}
          checked={selectedChoiceIds.includes(choice.id)}
          onChange={handleCheck(String(choice.id))}
          isVoted={isVoted}
        />
      ))}
    </div>
  );
}

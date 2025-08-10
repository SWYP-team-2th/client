import { useState } from 'react';
import CardItem from '@/components/poll-detail/Card/CardItem';
import { Post, PollChoice } from '@/types/post';

interface CardListProps {
  pollOption: {
    pollType: Post['pollOption']['pollType'];
  };
  pollChoices: PollChoice[];
}

export default function CardList({ pollOption, pollChoices }: CardListProps) {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {},
  );

  console.log(checkedItems);

  const handleCheck =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (pollOption.pollType === 'SINGLE') {
        // 단일 투표
        setCheckedItems({ [id]: e.target.checked });
      } else {
        // 복수 투표
        setCheckedItems((prev) => ({ ...prev, [id]: e.target.checked }));
      }
    };

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-8 mx-[30px]">
      {pollChoices.map((choice) => (
        <CardItem
          key={choice.id}
          choice={choice}
          checked={!!checkedItems[choice.id]}
          onChange={handleCheck(String(choice.id))}
        />
      ))}
    </div>
  );
}

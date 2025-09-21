import CardItem from '@/components/poll-detail/Card/CardItem';
import { useSelection } from '@/components/poll-detail/SelectionContext';
import { PollChoice } from '@/types/post';

interface CardListProps {
  pollChoices: PollChoice[];
  isVoted: boolean;
}

export default function CardList({ pollChoices, isVoted }: CardListProps) {
  const { checkedItems, handleVoteChoice, voteMode } = useSelection();

  const handleCheck =
    (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      handleVoteChoice(id, e.target.checked);
    };

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-6 mx-[18px] sm:gap-x-5 sm:gap-y-8 sm:mx-[30px]">
      {pollChoices.map((choice) => (
        <CardItem
          key={choice.id}
          choice={choice}
          checked={
            // voteMode가 true일 시 사용자 선택 상태만 (다시하기 모드)
            // voteMode가 false이고 투표 완료 후일 시: 서버 투표 상태 + 사용자 투표 선택 상태
            // - choice.voteId !== null: 실제로 서버에 투표된 항목 (테두리와 MY CHOOZ 표시)
            // - checkedItems.includes(choice.id): 사용자가 현재 선택한 항목
            // - OR 연산자로 둘 중 하나라도 true면 체크 상태로 표시

            // 투표 전: 사용자 선택 상태만
            // - checkedItems.includes(choice.id): 사용자가 현재 선택한 항목만 체크 상태로 표시
            voteMode
              ? checkedItems.includes(choice.id)
              : isVoted
                ? choice.voteId !== null || checkedItems.includes(choice.id)
                : checkedItems.includes(choice.id)
          }
          onChange={handleCheck(choice.id)}
          isVoted={isVoted && !voteMode}
        />
      ))}
    </div>
  );
}

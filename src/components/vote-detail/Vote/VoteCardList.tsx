import VoteCardItem from '@/components/vote-detail/Vote/VoteCardItem';

export default function VoteCardList() {
  return (
    <div className="my-[15px] flex gap-2">
      <VoteCardItem />
      <VoteCardItem />
    </div>
  );
}

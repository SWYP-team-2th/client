import Icon from '@/components/common/Icon';

interface HomeTaskCheckProps {
  participantCount: number;
  commentCount: number;
}

export default function HomeTaskCheck({
  participantCount,
  commentCount,
}: HomeTaskCheckProps) {
  return (
    <div className="flex">
      <div className="flex items-center mr-3 text-caption">
        <Icon name="VoteGray" size="small" />
        <span className="ml-[2px] text-gray-700">{participantCount}</span>
      </div>

      <div className="flex items-center mr-3 text-caption">
        <Icon name="MessageOutlineGray" size="small" />
        <span className="ml-[2px] text-gray-700">{commentCount}</span>
      </div>
    </div>
  );
}

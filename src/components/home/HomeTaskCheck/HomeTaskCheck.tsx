import Icon from '@/components/common/Icon';

export default function HomeTaskCheck() {
  return (
    <div className=" flex">
      <div className="flex items-center mr-3">
        <Icon name="VoteGray" size="small" />
        <span className="ml-[2px] text-gray-700">3</span>
      </div>

      <div className="flex items-center mr-3">
        <Icon name="MessageOutlineGray" size="small" />
        <span className="ml-[2px] text-gray-700">23</span>
      </div>
    </div>
  );
}

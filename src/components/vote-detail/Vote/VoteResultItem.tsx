export default function VoteResultItem() {
  return (
    <div className="flex items-center mb-sm">
      <div>
        <span className="pl-[1px] text-label-medium">뽀또A</span>
      </div>
      <div className="ml-[9px] flex flex-1">
        <div className="w-full h-[13px] bg-primary-300 rounded-tr-[99px] rounded-br-[99px]"></div>
      </div>
      <div className="ml-[13px]">7표 (70%)</div>
    </div>
  );
}

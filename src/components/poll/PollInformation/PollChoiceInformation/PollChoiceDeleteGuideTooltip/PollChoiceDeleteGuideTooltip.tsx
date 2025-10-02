export default function PollChoiceDeleteGuideTooltip() {
  return (
    <div className="relative">
      <div className="bg-primary-600 text-white px-3 py-[7px] rounded-xl text-body-2 whitespace-nowrap">
        옆으로 밀어서 삭제할 수 있어요
      </div>
      <div className="absolute top-full right-4 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-primary-600"></div>
    </div>
  );
}

import EmptyMyVoteList from '@/assets/images/my/EmptyMyVoteList.jpg';

export default function ZeroUI() {
  return (
    <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full min-h-[400px]">
      <img
        className="w-[100px] h-[100px]"
        src={EmptyMyVoteList}
        alt="아직 만든 투표가 없어요!"
      />
      <div className="flex flex-col gap-[6px]">
        <span className="text-gray-900 text-headline-1">
          아직 만든 투표가 없어요!
        </span>
        <span className="text-gray-600 text-body-1">
          첫 투표를 만들어 사람들의 선택을 받아보세요.
        </span>
      </div>
    </div>
  );
}

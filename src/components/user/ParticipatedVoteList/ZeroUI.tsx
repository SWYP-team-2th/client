import EmptyParticipatedVoteList from '@/assets/images/my/EmptyParticipatedVoteList.jpg';

export default function ZeroUI() {
  return (
    <div className="text-center text-gray-500 py-8 flex flex-col items-center">
      <img
        className="w-[188px] h-[188px]"
        src={EmptyParticipatedVoteList}
        alt="아직 참여한 투표가 없어요!"
      />
      <div className="flex flex-col gap-[6px]">
        <span className="text-gray-900 text-heading-2">
          아직 참여한 투표가 없어요!
        </span>
        <span className="text-gray-600 text-headline-3">
          다른 사람들의 투표에 참여하고, 결과도 확인해보세요.
        </span>
      </div>
    </div>
  );
}

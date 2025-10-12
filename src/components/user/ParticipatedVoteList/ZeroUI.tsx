import EmptyParticipatedVoteList from '@/assets/images/my/EmptyParticipatedVoteList.jpg';

export default function ZeroUI() {
  return (
    <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full min-h-[400px]">
      <img
        className="w-[148px] h-[148px]"
        src={EmptyParticipatedVoteList}
        alt="아직 참여한 투표가 없어요!"
      />
      <div className="flex flex-col gap-[6px]">
        <span className="text-gray-900 text-heading-2">
          아직 참여한 투표가 없어요!
        </span>
        <span className="text-gray-600 text-body-1">
          다른 사람들의 투표에 참여하고, 결과도 확인해보세요.
        </span>
      </div>
    </div>
  );
}

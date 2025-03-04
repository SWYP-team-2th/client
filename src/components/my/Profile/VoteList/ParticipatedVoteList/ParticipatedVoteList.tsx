import { Link } from 'react-router-dom';
import useParticipatedVoteList from './hooks';
import EmptyParticipatedVote from '@/assets/images/my/no-participated-vote-list.png';
import Icon from '@/components/common/Icon';
export default function MyVoteList() {
  const { participatedVoteList, observerRef } = useParticipatedVoteList();

  if (participatedVoteList.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img src={EmptyParticipatedVote} width={100} height={100} />
        <div className="flex flex-col gap-2 justify-between items-center break-keep text-center pt-3">
          <p className="text-title-medium">아직 참여한 투표가 없어요!</p>
          <p className="text-body-2-long text-gray-700">
            다른 사람들이 만든 투표에 참여하면 여기에 표시돼요!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-6">
      <div className="overflow-scroll grid grid-cols-3 gap-[6px]">
        {participatedVoteList.map((vote) => (
          <Link
            to={`/votes/${vote.shareUrl}`}
            key={vote.id}
            className="relative aspect-[140/177] rounded-xl overflow-hidden"
          >
            <img
              src={vote.bestPickedImageUrl}
              className="w-full h-full object-cover"
            />
            <Icon
              name="Link"
              size="medium"
              className="absolute top-2 right-2 rounded-[10px] bg-gray-300 w-[26px] h-[26px] flex items-center justify-center"
            />
          </Link>
        ))}
      </div>
      <div ref={observerRef} style={{ height: '10px' }} />
    </div>
  );
}

import { Link } from 'react-router-dom';
import useMyVoteList from './hooks';
import EmptyMyVote from '@/assets/images/my/no-my-vote-list.png';
import Icon from '@/components/common/Icon';

export default function MyVoteList() {
  const { author, myVoteList, observerRef, handleClickVoteShare } =
    useMyVoteList();

  if (myVoteList.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img src={EmptyMyVote} width={160} height={160} />
        <div className="flex flex-col gap-2 justify-between items-center break-keep text-center">
          <p className="text-h3">아직 올린 투표가 없어요!</p>
          <p className="text-title-small text-gray-700">
            첫 번째 투표를 만들고 친구들과 공유해보세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {myVoteList.map((vote) => (
        <Link
          to={`/votes/${vote.shareUrl}`}
          key={vote.id}
          className="relative aspect-[71/106] rounded-xl"
        >
          <img
            src={vote.bestPickedImageUrl}
            className="w-full h-full object-cover"
          />
          <Icon
            name="Link"
            size="medium"
            onClick={(e) => {
              e.preventDefault();
              handleClickVoteShare({
                author: author ?? '',
                shareUrl: `${window.location.origin}/votes/${vote.shareUrl}`,
              });
            }}
            className="absolute top-2 right-2 rounded-[10px] bg-gray-300 w-[26px] h-[26px] flex items-center justify-center"
          />
        </Link>
      ))}
      <div ref={observerRef} style={{ height: '10px' }} />
    </div>
  );
}

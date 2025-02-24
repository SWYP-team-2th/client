import { Link } from 'react-router-dom';
import useMyVoteList from './hooks';
import Icon from '@/components/common/Icon';

export default function MyVoteList() {
  const { myVoteList, observerRef } = useMyVoteList();

  return (
    <div className="overflow-scroll grid grid-cols-3 gap-2">
      {myVoteList.map((vote) => (
        <Link
          to={vote.shareUrl}
          key={vote.id}
          className="relative aspect-[71/106]"
        >
          <img src={vote.bestPickedImageUrl} />
          <Icon
            name="Link"
            size="medium"
            className="absolute top-2 right-2 rounded-[10px] bg-gray-300 w-[26px] h-[26px] flex items-center justify-center"
          />
        </Link>
      ))}
      <div ref={observerRef} style={{ height: '10px' }} />
    </div>
  );
}

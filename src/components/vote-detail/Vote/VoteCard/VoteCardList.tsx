import { useParams } from 'react-router-dom';
import VoteCardItem from './VoteCardItem';
import useVoteDetail from '@/components/vote-detail/Vote/VoteCard/hooks';

export default function VoteCardList() {
  const { postId } = useParams<{ postId: string }>();
  const { voteDetail } = useVoteDetail(Number(postId));

  return (
    <div className="flex space-x-6 my-[15px] px-[12px]">
      {voteDetail.images.map((image) => (
        <VoteCardItem key={image.id} image={image} postId={Number(postId)} />
      ))}
    </div>
  );
}

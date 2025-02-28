import { useParams } from 'react-router-dom';
import VoteCardItem from './VoteCardItem';
import ImageDetailModal from '../../ImageDetailModal';
import useVote from '@/api/useVote';
import { useDialog } from '@/components/common/Dialog/hooks';
import Loading from '@/components/common/Loading';
import useVoteDetail from '@/components/vote-detail/Vote/VoteCard/hooks';

export default function VoteCardList() {
  const { postId } = useParams<{ postId: string }>();
  const { voteDetail } = useVoteDetail(Number(postId));
  const { mutate: voteMutate, isPending } = useVote(Number(postId));
  const { openDialog } = useDialog();

  const handleClickVoteCardItem = (id: number) => {
    openDialog(
      <ImageDetailModal images={voteDetail.images} selectedImageId={id} />,
    );
  };

  const handleVote =
    (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      voteMutate(id);
    };

  return (
    <div className="flex w-full space-x-6 my-[15px] px-[12px] relative">
      {isPending && (
        <div className="absolute w-full inset-0 z-10 bg-gray-100/50">
          <Loading />
        </div>
      )}
      {voteDetail.images.map((image) => (
        <VoteCardItem
          key={image.id}
          image={image}
          onClick={() => handleClickVoteCardItem(image.id)}
          handleVote={handleVote(image.id)}
        />
      ))}
    </div>
  );
}

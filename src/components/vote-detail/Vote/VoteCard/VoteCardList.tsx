import { useParams } from 'react-router-dom';
import VoteCardItem from './VoteCardItem';
import ImageDetailModal from '../../ImageDetailModal';
import { useDialog } from '@/components/common/Dialog/hooks';
import useVoteDetail from '@/components/vote-detail/Vote/VoteCard/hooks';

export default function VoteCardList() {
  const { postId } = useParams<{ postId: string }>();
  const { voteDetail } = useVoteDetail(Number(postId));
  const { openDialog } = useDialog();

  const handleClickVoteCardItem = (id: number) => {
    openDialog(
      <ImageDetailModal images={voteDetail.images} selectedImageId={id} />,
    );
  };

  return (
    <div className="flex space-x-6 my-[15px] px-[12px]">
      {voteDetail.images.map((image) => (
        <VoteCardItem
          key={image.id}
          image={image}
          postId={Number(postId)}
          onClick={() => handleClickVoteCardItem(image.id)}
        />
      ))}
    </div>
  );
}

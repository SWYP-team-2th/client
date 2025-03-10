import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import VoteCardItem from './VoteCardItem';
import ImageDetailModal from '../../ImageDetailModal';
import useGetMyInfo from '@/api/useGetMyInfo';
import useVote from '@/api/useVote';
import { useDialog } from '@/components/common/Dialog/hooks';
import Loading from '@/components/common/Loading';
import LoginDialog from '@/components/common/LoginDialog';
import useVoteDetail from '@/components/vote-detail/Vote/VoteCard/hooks';

export default function VoteCardList() {
  const { shareUrl } = useParams<{ shareUrl: string }>();
  const { openDialog } = useDialog();
  const { data: myInfo } = useGetMyInfo();
  const { voteDetail } = useVoteDetail(shareUrl ?? '');
  const queryClient = useQueryClient();
  const { mutate: voteMutate, isPending: isVotePending } = useVote(
    voteDetail.id,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['voteDetail', shareUrl],
        });
        queryClient.invalidateQueries({
          queryKey: ['voteStatus', voteDetail.id],
        });
      },
    },
  );

  const handleClickVoteCardItem = (id: number) => {
    openDialog(<ImageDetailModal selectedImageId={id} />);
  };

  const handleVote =
    (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (!myInfo) {
        openDialog(<LoginDialog />);
        return;
      }

      voteMutate(id);
      console.log(id);
    };

  return (
    <div className="flex w-full space-x-3 mt-5 px-2 relative">
      {isVotePending && (
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

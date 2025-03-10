import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import VoteCardItem from './VoteCardItem';
import ImageDetailModal from '../../ImageDetailModal';
import { useCancelVote } from '@/api/useCancelVoted';
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

  const { mutate: voteCancel } = useCancelVote({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['voteDetail', shareUrl],
      });
      queryClient.invalidateQueries({
        queryKey: ['voteStatus', voteDetail.id],
      });
    },
  });

  const handleClickVoteCardItem = (id: number) => {
    openDialog(<ImageDetailModal selectedImageId={id} />);
  };

  const handleVote =
    (id: number, voteId: number | null) =>
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (!myInfo) {
        openDialog(<LoginDialog />);
        return;
      }

      if (voteId) {
        voteCancel(voteId);
      } else {
        voteMutate(id);
      }

      voteMutate(id);
    };

  const imageCount = voteDetail.images.length;
  const photoGrid =
    imageCount === 2 || imageCount === 4 ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <div className="flex w-full space-x-3 mt-5 px-2 relative">
      {isVotePending && (
        <div className="absolute w-full inset-0 z-10 bg-gray-100/50">
          <Loading />
        </div>
      )}
      <div className={`w-full justify-center grid ${photoGrid} gap-3`}>
        {voteDetail.images.map((image) => (
          <VoteCardItem
            key={image.id}
            image={image}
            onClick={() => handleClickVoteCardItem(image.id)}
            handleVote={handleVote(image.id, image.voteId)}
          />
        ))}
      </div>
    </div>
  );
}

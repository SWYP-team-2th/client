import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import VoteCardItem from './VoteCardItem';
import ImageDetailModal from '../../ImageDetailModal';
import useVote from '@/api/useVote';
import { useDialog } from '@/components/common/Dialog/hooks';
import Loading from '@/components/common/Loading';
import LoginDialog from '@/components/common/LoginDialog/LoginDialog';
import { getAccessToken } from '@/components/login/Auth/token';
import useVoteDetail from '@/components/vote-detail/Vote/VoteCard/hooks';

export default function VoteCardList() {
  const { shareUrl } = useParams<{ shareUrl: string }>();
  const { openDialog } = useDialog();
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

  // TODO: 추후 로직 살리기
  // const { mutate: postGuestVote, isPending: isGuestVotePending } =
  //   usePostGuestVote(voteDetail.id, {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({
  //         queryKey: ['voteDetail', shareUrl],
  //       });
  //     },
  //   });

  const handleClickVoteCardItem = (id: number) => {
    openDialog(
      <ImageDetailModal images={voteDetail.images} selectedImageId={id} />,
    );
  };

  const handleVote =
    (id: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      const accessToken = getAccessToken();

      if (accessToken) {
        voteMutate(id);
      } else {
        openDialog(<LoginDialog />);
      }
    };

  return (
    <div className="flex w-full space-x-6 my-[15px] px-[12px] relative">
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

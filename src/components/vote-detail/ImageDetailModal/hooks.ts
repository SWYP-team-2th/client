import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useCancelVote } from '@/api/useCancelVoted';
import useGetVoteDetail from '@/api/useGetVoteDetail';
import useVote from '@/api/useVote';
import { useDialog } from '@/components/common/Dialog/hooks';
import useToast from '@/components/common/Toast/hooks';

interface UseImageDetailModalOptions {
  selectedImageId: number;
}

export default function useImageDetailModal({
  selectedImageId,
}: UseImageDetailModalOptions) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { closeDialog } = useDialog();
  const shareUrl = window.location.pathname.split('/')[2];
  const { data: voteDetail } = useGetVoteDetail(shareUrl);
  const { mutate: postVote, isPending: isPostVotePending } = useVote(
    voteDetail?.id ?? 0,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['voteDetail', shareUrl],
        });
        queryClient.invalidateQueries({
          queryKey: ['voteStatus', voteDetail?.id],
        });
      },
    },
  );
  const { mutate: deleteVote, isPending: isDeleteVotePending } = useCancelVote({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['voteDetail', shareUrl],
      });
      queryClient.invalidateQueries({
        queryKey: ['voteStatus', voteDetail?.id],
      });
    },
  });

  const [currentImageId, setCurrentImageId] = useState(
    (selectedImageId || voteDetail?.images[0]?.id) ?? 0,
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentIndex =
    voteDetail?.images.findIndex((img) => img.id === currentImageId) ?? 0;

  const handleScrollCapture = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const itemWidth = container.clientWidth;

    const visibleIndex = Math.round(container.scrollLeft / itemWidth);

    if (
      voteDetail?.images[visibleIndex] &&
      voteDetail?.images[visibleIndex].id !== currentImageId
    ) {
      setCurrentImageId(voteDetail?.images[visibleIndex].id ?? 0);
    }
  };

  const handleClickImage = (id: number) => {
    const index = voteDetail?.images.findIndex((img) => img.id === id) ?? 0;

    if (scrollContainerRef.current && index !== -1) {
      scrollContainerRef.current.scrollLeft =
        index * scrollContainerRef.current.clientWidth;

      setTimeout(() => {
        setCurrentImageId(id);
      }, 300);
    }
  };

  const handleClickVoteButton = () => {
    if (voteDetail?.status === 'CLOSED') {
      toast.warning({
        title: '이미 마감된 투표예요!',
      });
      return;
    }

    const image = voteDetail?.images.find((img) => img.id === currentImageId);

    if (image?.voteId) {
      deleteVote(image?.voteId);
    } else {
      postVote(currentImageId);
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current && currentIndex !== -1) {
      scrollContainerRef.current.scrollLeft =
        currentIndex * scrollContainerRef.current.clientWidth;
    }
  }, [selectedImageId]);

  return {
    scrollContainerRef,
    images: voteDetail?.images ?? [],
    isVotePending: isPostVotePending || isDeleteVotePending,
    currentIndex,
    currentImageId,
    handleScrollCapture,
    handleClickImage,
    handleClickVoteButton,
    closeDialog,
  };
}

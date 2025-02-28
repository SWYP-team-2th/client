import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import CloseConfirmDialog from './CloseConfirmDIalog';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import useGetVoteDetail from '@/api/useGetVoteDetail';
import { useBottomSheet } from '@/components/common/BottomSheet/hooks';
import { useDialog } from '@/components/common/Dialog/hooks';
import LinkShareBottomSheet from '@/components/common/LinkShareBottomSheet';

export default function useVoteVerticalEllipsis() {
  const { shareUrl } = useParams<{ shareUrl: string }>();
  const { openDialog } = useDialog();
  const { openBottomSheet } = useBottomSheet();

  const [isOpen, setIsOpen] = useState(false);
  const ellipsisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ellipsisRef.current &&
        !ellipsisRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { data: voteDetail } = useGetVoteDetail(shareUrl ?? '');

  const handleCloseVote = () => {
    openDialog(<CloseConfirmDialog postId={voteDetail.id} />);
  };

  const handleDelete = () => {
    openDialog(<DeleteConfirmDialog postId={voteDetail.id} />);
  };

  const handleClickVoteShare = () => {
    openBottomSheet(
      <LinkShareBottomSheet
        author={voteDetail.author.nickname}
        shareUrl={`${window.location.origin}/votes/${voteDetail.shareUrl}`}
      />,
    );
  };

  return {
    isOpen,
    setIsOpen,
    ellipsisRef,
    handleCloseVote,
    handleDelete,
    handleClickVoteShare,
  };
}

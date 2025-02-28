import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import CloseConfirmDialog from './CloseConfirmDIalog';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import useGetVoteDetail from '@/api/useGetVoteDetail';
import { useBottomSheet } from '@/components/common/BottomSheet/hooks';
import { useDialog } from '@/components/common/Dialog/hooks';
import LinkShareBottomSheet from '@/components/common/LinkShareBottomSheet';

export default function useVoteVerticalEllipsis() {
  const { postId } = useParams<{ postId: string }>();
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

  const { data: voteDetail } = useGetVoteDetail(Number(postId));

  const handleCloseVote = () => {
    openDialog(<CloseConfirmDialog postId={Number(postId)} />);
  };

  const handleDelete = () => {
    openDialog(<DeleteConfirmDialog postId={Number(postId)} />);
  };

  const handleClickVoteShare = () => {
    openBottomSheet(
      <LinkShareBottomSheet
        author={voteDetail.author.nickname}
        shareUrl={voteDetail.shareUrl}
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

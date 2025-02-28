import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeletePost } from '@/api/useDeletePost';
import useGetVoteDetail from '@/api/useGetVoteDetail';
import { useBottomSheet } from '@/components/common/BottomSheet/hooks';
import LinkShareBottomSheet from '@/components/common/LinkShareBottomSheet';

export default function useVoteVerticalEllipsis() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
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

  const { mutate: deletePost } = useDeletePost();
  const { data: voteDetail } = useGetVoteDetail(Number(postId));

  const handleDelete = () => {
    // 추후 로그인 삭제 모달로 대체
    if (confirm('게시글 삭제?')) {
      deletePost(Number(postId), {
        onSuccess: () => {
          navigate('/');
        },
      });
    }
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
    handleDelete,
    handleClickVoteShare,
  };
}

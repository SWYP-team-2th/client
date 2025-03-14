import { useEffect, useRef } from 'react';
import { useGetMyVoteList } from '@/api/useGetVoteList';
import { useBottomSheet } from '@/components/common/BottomSheet/hooks';
import LinkShareBottomSheet from '@/components/common/LinkShareBottomSheet';

export default function useMyVoteList() {
  const observerRef = useRef<HTMLDivElement>(null);
  const { openBottomSheet } = useBottomSheet();

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetMyVoteList();

  const myVoteList = data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: scrollContainer, threshold: 0.1 },
    );

    const currentObserver = observerRef.current;
    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  const handleClickVoteShare = ({ shareUrl }: { shareUrl: string }) => {
    openBottomSheet(<LinkShareBottomSheet shareUrl={shareUrl} />);
  };
  return {
    myVoteList,
    observerRef,
    handleClickVoteShare,
  };
}

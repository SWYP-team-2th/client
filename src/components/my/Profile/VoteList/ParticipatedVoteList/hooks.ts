import { useEffect, useRef } from 'react';
import { useGetParticipatedVoteList } from '@/api/useGetVoteList';

export default function useParticipatedVoteList() {
  const observerRef = useRef<HTMLDivElement>(null);
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetParticipatedVoteList();

  const participatedVoteList = data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
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

  return {
    participatedVoteList,
    observerRef,
  };
}

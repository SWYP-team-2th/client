import { useEffect, useRef } from 'react';
import { useGetMyVoteList } from '@/api/useGetVoteList';

export default function useMyVoteList() {
  const observerRef = useRef<HTMLDivElement>(null);
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetMyVoteList();

  const myVoteList = data?.pages.flatMap((page) => page.data) ?? [];

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
    myVoteList,
    observerRef,
  };
}

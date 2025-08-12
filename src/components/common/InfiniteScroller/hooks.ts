import { useRef, useEffect } from 'react';

interface UseInfiniteScrollerOptions {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  threshold?: number;
  rootMargin?: string;
}

export function useInfiniteScroller({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  threshold = 0.1,
  rootMargin = '0px',
}: UseInfiniteScrollerOptions) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(observerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, threshold, rootMargin]);

  return observerRef;
}

import { useEffect, useRef } from 'react';
import useComment from '../vote-detail/Comment/CommentList/hooks';

export default function useCommentDetail() {
  const {
    commentsData,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useComment(20);

  const comments = commentsData?.pages.flatMap((page) => page.data);

  const observerRef = useRef<HTMLDivElement>(null);

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
    comments,
    observerRef,
    isLoading,
  };
}

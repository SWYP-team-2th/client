import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { UserInfoType } from '@/api/useGetUserInfo';
import { useGetMyVoteList } from '@/api/useGetVoteList';
import { useBottomSheet } from '@/components/common/BottomSheet/hooks';
import LinkShareBottomSheet from '@/components/common/LinkShareBottomSheet';

export default function useMyVoteList() {
  const { userId } = useParams<{ userId: string }>();
  const observerRef = useRef<HTMLDivElement>(null);
  const { openBottomSheet } = useBottomSheet();
  const queryClient = useQueryClient();

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetMyVoteList();

  const userInfo = queryClient.getQueryData<UserInfoType>(['user', userId]);

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

  const handleClickVoteShare = ({
    author,
    shareUrl,
  }: {
    author: string;
    shareUrl: string;
  }) => {
    openBottomSheet(
      <LinkShareBottomSheet author={author} shareUrl={shareUrl} />,
    );
  };
  return {
    author: userInfo?.nickname,
    myVoteList,
    observerRef,
    handleClickVoteShare,
  };
}

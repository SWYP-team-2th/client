import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useDialog } from '@/components/common/Dialog/hooks';
import { Post } from '@/types/post';

interface UseImageDetailModalOptions {
  postId: string;
  selectedImageId: number;
}

export default function useImageDetailModal({
  postId,
  selectedImageId,
}: UseImageDetailModalOptions) {
  const queryClient = useQueryClient();
  const { closeDialog } = useDialog();

  const post = queryClient.getQueryData<Post>(['post', postId]);

  const [currentImageId, setCurrentImageId] = useState(
    (selectedImageId || post?.pollChoices[0]?.id) ?? 0,
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentIndex =
    post?.pollChoices.findIndex((img) => img.id === currentImageId) ?? 0;

  const handleScrollCapture = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const itemWidth = container.clientWidth;

    const visibleIndex = Math.round(container.scrollLeft / itemWidth);

    if (
      post?.pollChoices[visibleIndex] &&
      post?.pollChoices[visibleIndex].id !== currentImageId
    ) {
      setCurrentImageId(post?.pollChoices[visibleIndex].id ?? 0);
    }
  };

  const handleClickImage = (id: number) => {
    const index = post?.pollChoices.findIndex((img) => img.id === id) ?? 0;

    if (scrollContainerRef.current && index !== -1) {
      scrollContainerRef.current.scrollLeft =
        index * scrollContainerRef.current.clientWidth;

      setTimeout(() => {
        setCurrentImageId(id);
      }, 300);
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current && currentIndex !== -1) {
      scrollContainerRef.current.scrollLeft =
        currentIndex * scrollContainerRef.current.clientWidth;
    }
  }, [selectedImageId]);

  return {
    post,
    scrollContainerRef,
    images: post?.pollChoices ?? [],
    currentIndex,
    currentImageId,
    handleScrollCapture,
    handleClickImage,
    closeDialog,
  };
}

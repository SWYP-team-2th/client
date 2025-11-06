import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useDialog } from '@/components/common/Dialog/hooks';
import { Post } from '@/types/post';

interface UseImageDetailModalOptions {
  postId: string;
  selectedImageId: number;
  shareKey?: string;
}

export default function useImageDetailModal({
  postId,
  selectedImageId,
  shareKey,
}: UseImageDetailModalOptions) {
  const queryClient = useQueryClient();
  const { closeDialog } = useDialog();

  const post = queryClient.getQueryData<Post>([
    'post',
    postId,
    shareKey ?? undefined,
  ]);

  const [currentImageId, setCurrentImageId] = useState(
    (selectedImageId || post?.pollChoices[0]?.id) ?? 0,
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (thumbnailContainerRef.current && currentIndex !== -1) {
      const container = thumbnailContainerRef.current;
      const thumbnails = container.querySelectorAll('button');
      const selectedThumbnail = thumbnails[currentIndex];

      if (selectedThumbnail) {
        const containerWidth = container.offsetWidth;
        const thumbnailLeft = selectedThumbnail.offsetLeft;
        const thumbnailWidth = selectedThumbnail.offsetWidth;

        const thumbnailCenter = thumbnailLeft + thumbnailWidth / 2;
        const viewportCenter = containerWidth / 2;
        const scrollPosition = thumbnailCenter - viewportCenter;

        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        });
      }
    }
  }, [currentImageId, currentIndex]);

  return {
    post,
    scrollContainerRef,
    thumbnailContainerRef,
    images: post?.pollChoices ?? [],
    currentIndex,
    currentImageId,
    handleScrollCapture,
    handleClickImage,
    closeDialog,
  };
}

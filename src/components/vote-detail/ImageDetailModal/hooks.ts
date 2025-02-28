import { useEffect, useRef, useState } from 'react';
import { Image } from '@/api/useGetVoteDetail';
import { useDialog } from '@/components/common/Dialog/hooks';

interface UseImageDetailModalOptions {
  images: Image[];
  selectedImageId: number;
}

export default function useImageDetailModal({
  images,
  selectedImageId,
}: UseImageDetailModalOptions) {
  const { closeDialog } = useDialog();

  const [currentImageId, setCurrentImageId] = useState(
    selectedImageId || images[0]?.id,
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentIndex = images.findIndex((img) => img.id === currentImageId);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const itemWidth = container.clientWidth;

    const visibleIndex = Math.round(container.scrollLeft / itemWidth);

    if (images[visibleIndex] && images[visibleIndex].id !== currentImageId) {
      setCurrentImageId(images[visibleIndex].id);
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current && currentIndex !== -1) {
      scrollContainerRef.current.scrollLeft =
        currentIndex * scrollContainerRef.current.clientWidth;
    }
  }, [selectedImageId]);

  return {
    scrollContainerRef,
    imageNum: images.length,
    images,
    currentIndex,
    handleScroll,
    closeDialog,
  };
}

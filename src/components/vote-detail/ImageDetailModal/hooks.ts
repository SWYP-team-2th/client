import { useState } from 'react';
import { useDialog } from '@/components/common/Dialog/hooks';
export default function useImageDetailModal() {
  const { closeDialog } = useDialog();

  // TODO: 이미지 원본 api 연결
  const images = [
    {
      id: 1,
      url: 'https://picsum.photos/200/300',
    },
    {
      id: 2,
      url: 'https://picsum.photos/200/300',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    const newIndex = Math.round(scrollLeft / width);

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  return {
    imageNum: images.length,
    images,
    currentIndex,
    handleScroll,
    closeDialog,
  };
}

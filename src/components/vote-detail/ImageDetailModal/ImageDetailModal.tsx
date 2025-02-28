import useImageDetailModal from './hooks';
import { Image } from '@/api/useGetVoteDetail';
import Icon from '@/components/common/Icon';

interface ImageDetailModalProps {
  images: Image[];
  selectedImageId: number;
}

export default function ImageDetailModal({
  images,
  selectedImageId,
}: ImageDetailModalProps) {
  const { scrollContainerRef, currentIndex, handleScroll, closeDialog } =
    useImageDetailModal({
      images,
      selectedImageId,
    });

  return (
    <div className="bg-gray-700 w-full h-[100dvh] max-w-[480px] flex flex-col">
      <header className="h-[57px] flex items-center justify-between px-4 text-white z-10">
        <button onClick={closeDialog}>
          <Icon name="ArrowLeft" size="medium" />
        </button>
        <div className="text-white">
          <span className="font-medium">{currentIndex + 1}</span>
          <span className="mx-1">/</span>
          <span>{images.length}</span>
        </div>
        <div className="w-[24px] h-full"></div>
      </header>

      <div
        ref={scrollContainerRef}
        className="flex-1 flex overflow-x-auto snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
        onScroll={handleScroll}
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="min-w-full h-full flex-shrink-0 snap-center flex items-center justify-center"
          >
            <img
              src={image.imageUrl}
              alt={`image-${image.id}`}
              className="w-full h-auto max-h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

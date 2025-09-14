import useImageDetailModal from './hooks';
import Icon from '@/components/common/Icon';
import { cn } from '@/utils/cn';

interface ImageDetailModalProps {
  postId: string;
  selectedImageId: number;
}

export default function ImageDetailModal({
  postId,
  selectedImageId,
}: ImageDetailModalProps) {
  const {
    post,
    scrollContainerRef,
    currentIndex,
    currentImageId,
    images,
    handleScrollCapture,
    handleClickImage,
    closeDialog,
  } = useImageDetailModal({
    postId,
    selectedImageId,
  });

  if (!post) {
    return null;
  }

  return (
    <div className="bg-gray-700 w-full h-[100dvh] max-w-[480px] flex flex-col">
      <header className="h-[57px] flex items-center justify-between px-4 text-white z-10">
        <button onClick={closeDialog}>
          <Icon name="ArrowLeft" size="medium" />
        </button>
        <div className="text-white">{images[currentIndex].title}</div>
        <div className="w-[24px] h-full"></div>
      </header>

      <div
        ref={scrollContainerRef}
        className="flex-1 flex overflow-x-auto snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
        onScrollCapture={handleScrollCapture}
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center"
          >
            <img
              src={image.imageUrl}
              alt={`image-${image.id}`}
              className="w-full h-auto object-contain"
            />
          </div>
        ))}
      </div>

      <div className="overflow-x-auto fixed bottom-16 w-full flex flex-col gap-6">
        <p className="text-white text-body-2-long text-center">
          {currentIndex + 1} / {images.length}
        </p>
        <div className="flex gap-2 px-6 pt-1 min-w-max ">
          {images.map((image) => (
            <button
              key={image.id}
              className="w-20 h-20"
              onClick={() => handleClickImage(image.id)}
            >
              <img
                className={cn(
                  'rounded-lg overflow-hidden object-cover w-full h-full',
                  image.id === currentImageId &&
                    'border-[3px] border-primary-500',
                )}
                src={image.imageUrl}
                alt={`image-${image.id}`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import useImageDetailModal from './hooks';
import { FloatingButton } from '@/components/common/Button/FloatingButton';
import Icon from '@/components/common/Icon';
import Loading from '@/components/common/Loading';
import { cn } from '@/utils/cn';

interface ImageDetailModalProps {
  selectedImageId: number;
}

export default function ImageDetailModal({
  selectedImageId,
}: ImageDetailModalProps) {
  const {
    scrollContainerRef,
    currentIndex,
    currentImageId,
    images,
    isPostVotePending,
    handleScrollCapture,
    handleClickImage,
    handleClickVoteButton,
    closeDialog,
  } = useImageDetailModal({
    selectedImageId,
  });

  return (
    <div className="bg-gray-700 w-full h-[100dvh] max-w-[480px] flex flex-col">
      <header className="h-[57px] flex items-center justify-between px-4 text-white z-10">
        <button onClick={closeDialog}>
          <Icon name="ArrowLeft" size="medium" />
        </button>
        <div className="text-white">{images[currentIndex].imageName}</div>
        <div className="w-[24px] h-full"></div>
      </header>

      <div className="flex gap-2 pl-6 pt-1 overflow-x-auto">
        {images.map((image) => (
          <button
            key={image.id}
            className="w-[64px] h-[94px]"
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

      <FloatingButton
        size="small"
        className="bg-gray-100 fixed bottom-16 right-6"
        onClick={handleClickVoteButton}
        disabled={isPostVotePending}
      >
        {isPostVotePending ? (
          <Loading />
        ) : (
          <Icon
            name={
              images.find((image) => image.id === currentImageId)?.voteId
                ? 'HeartFillRed'
                : 'HeartOutline'
            }
            size="medium"
          />
        )}
      </FloatingButton>
    </div>
  );
}

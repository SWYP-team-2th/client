import ImageItem from '@/components/home/HomeImages/ImageItem';

interface ImageListProps {
  images: { id: number; imageUrl: string }[];
  shareUrl: string;
}

// 여기서 클릭 시 shareUrl 연결
export default function ImageList({ images }: ImageListProps) {
  return (
    <div className="w-full overflow-x-auto mb-[6px] pl-[2px]">
      <div className="flex space-x-[6px] w-max">
        {images.map((image) => (
          <ImageItem key={image.id} imageUrl={image.imageUrl} />
        ))}
      </div>
    </div>
  );
}

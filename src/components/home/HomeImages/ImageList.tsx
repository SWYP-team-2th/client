import { useNavigate } from 'react-router-dom';
import ImageItem from '@/components/home/HomeImages/ImageItem';

interface ImageListProps {
  images: { id: number; imageUrl: string }[];
  shareUrl: string;
}

export default function ImageList({ images, shareUrl }: ImageListProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (shareUrl) {
      navigate(`/votes/${shareUrl}`);
    }
  };

  return (
    <div className="w-full overflow-x-auto mb-[6px] pl-[2px]">
      <div className="flex space-x-[6px] w-max">
        {images.map((image) => (
          <ImageItem
            key={image.id}
            imageUrl={image.imageUrl}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}

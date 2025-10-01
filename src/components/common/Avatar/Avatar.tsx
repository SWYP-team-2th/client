import { AvatarSize } from './types';
import { getAvatarSize } from './utils';
import { cn } from '@/utils/cn';

interface AvatarProps {
  size: AvatarSize;
  src: string;
  alt?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}

export default function Avatar({
  size,
  src,
  alt,
  className,
  onClick,
}: AvatarProps) {
  return (
    <img
      onClick={onClick}
      src={src}
      alt={alt}
      className={cn(
        getAvatarSize(size),
        'rounded-full overflow-hidden border-[0.4px] border-white',
        className,
      )}
    />
  );
}

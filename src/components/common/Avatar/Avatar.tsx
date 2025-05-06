import { AvatarSize } from './types';
import { getAvatarSize } from './utils';
import { cn } from '@/utils/cn';

interface AvatarProps {
  size: AvatarSize;
  src: string;
  alt?: string;
  className?: string;
}

export default function Avatar({ size, src, alt, className }: AvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        getAvatarSize(size),
        'rounded-full overflow-hidden',
        className,
      )}
    />
  );
}

import type { AvatarSize } from './types';

export const getAvatarSize = (size: AvatarSize): string => {
  switch (size) {
    case 'xSmall':
      return 'w-6 h-6';
    case 'small':
      return 'w-7 h-7';
    case 'medium':
      return 'w-8 h-8';
    case 'large':
      return 'w-10 h-10';
    case 'xLarge':
      return 'w-16 h-16';
  }
};

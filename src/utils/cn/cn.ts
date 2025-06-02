import { clsx, ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-title-1',
        'text-title-2',
        'text-title-3',
        'text-heading-1',
        'text-heading-2',
        'text-headline-1',
        'text-headline-2',
        'text-headline-3',
        'text-body-1',
        'text-body-1-long',
        'text-body-2',
        'text-body-2-long',
        'text-caption-1',
        'text-caption-2',
        'text-label-1',
        'text-label-2',
        'text-label-3',
        'text-label-4',
      ],
    },
  },
});

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
export default cn;

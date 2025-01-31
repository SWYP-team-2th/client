import { cn } from '@/utils/cn';

export interface ButtonExampleProps {
  text: string;
  variant: 'primary' | 'secondary';
}

export default function ButtonExample({ text, variant }: ButtonExampleProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md',
        variant === 'primary' && 'bg-blue-500',
        variant === 'secondary' && 'bg-red-500',
      )}
    >
      {text}
    </button>
  );
}

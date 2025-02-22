import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/utils/cn';

const floatingButtonVariants = cva(
  'flex items-center justify-center rounded-full cursor-pointer',
  {
    variants: {
      size: {
        small: 'w-[56px] h-[56px]',
        large: 'w-[72px] h-[72px]',
      },
      buttonType: {
        primary: 'bg-primary-400',
        secondary: 'bg-accent-500',
        tertiary: 'bg-primary-300',
      },
    },
  },
);

interface FloatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof floatingButtonVariants> {
  children: React.ReactNode;
}

export const FloatingButton = React.forwardRef<
  HTMLButtonElement,
  FloatingButtonProps
>(({ size, buttonType, children, className, ...props }, ref) => {
  return (
    <button
      className={cn(floatingButtonVariants({ size, buttonType }), className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/utils/cn';

const labelVariants = cva(
  'flex items-center justify-center px-[7px] py-[5px] whitespace-nowrap overflow-hidden',
  {
    variants: {
      variant: {
        primary: 'bg-primary-300 !text-gray-900',
        secondary: 'bg-accent-600 !text-gray-100',
      },
      size: {
        small: 'w-[50px] h-[24px] rounded-[99px] text-label-small',
        large: 'w-[65px] h-[24px] rounded-[99px] text-label-small',
      },
    },
  },
);

interface LabelProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof labelVariants> {
  asChild?: boolean;
  size: 'small' | 'large';
  variant: 'primary' | 'secondary';
}

export const Label = React.forwardRef<HTMLSpanElement, LabelProps>(
  ({ variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';
    return (
      <Comp
        className={cn(
          labelVariants({
            variant,
            size,
          }),
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

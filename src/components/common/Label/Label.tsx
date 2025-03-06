import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/utils/cn';

const labelVariants = cva(
  'flex items-center justify-center px-[7px] py-[3px] whitespace-nowrap overflow-hidden rounded-full text-label-small',
  {
    variants: {
      variant: {
        solid: '',
        outline: 'bg-gray-100 border',
      },
      color: {
        isPicked: 'bg-primary-400 !text-gray-800 ',
        isProgress: 'border-primary-500 !text-primary-600',
        voteEnded: 'border-accent-400 !text-accent-500',
      },
    },
  },
);

interface LabelProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof labelVariants> {
  asChild?: boolean;
  variant: 'solid' | 'outline';
  color: 'isPicked' | 'isProgress' | 'voteEnded';
}

export const Label = React.forwardRef<HTMLSpanElement, LabelProps>(
  ({ variant, color, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';
    return (
      <Comp
        className={cn(
          labelVariants({
            variant,
            color,
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

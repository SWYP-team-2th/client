import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/utils/cn';

const labelVariants = cva(
  'flex items-center justify-center whitespace-nowrap',
  {
    variants: {
      variant: {
        solid: 'rounded-sm',
        outline: 'border rounded-sm',
      },
      colorVarient: {
        neutral: '',
        progress: '',
        ended: '',
      },
      size: {
        small: 'h-[20px] min-w-[41px] px-[6px] py-[3px] text-label-4',
        medium: 'h-[24px] min-w-[46px] px-[6px] py-[3px] text-label-2',
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        colorVarient: 'neutral',
        className: 'bg-gray-400 text-gray-100',
      },
      {
        variant: 'solid',
        colorVarient: 'progress',
        className: 'bg-primary-500 text-gray-100',
      },
      {
        variant: 'solid',
        colorVarient: 'ended',
        className: 'bg-accent-900 text-gray-100',
      },

      {
        variant: 'outline',
        colorVarient: 'neutral',
        className: 'border-gray-300 text-gray-400',
      },
      {
        variant: 'outline',
        colorVarient: 'progress',
        className: 'border-primary-500 text-primary-600',
      },
      {
        variant: 'outline',
        colorVarient: 'ended',
        className: 'border-accent-900 text-accent-900',
      },
    ],
  },
);

interface LabelProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof labelVariants> {
  asChild?: boolean;
}

export const Label = React.forwardRef<HTMLSpanElement, LabelProps>(
  (
    {
      variant,
      colorVarient,
      size,
      asChild = false,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'span';
    return (
      <Comp
        className={cn(
          labelVariants({ variant, colorVarient, size }),
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'flex items-center justify-center cursor-pointer max-w-[430px]',
  {
    variants: {
      variant: {
        solid: '',
        outline: 'border bg-gray-100',
      },
      size: {
        small: 'w-[157px] h-[40px] rounded-lg text-label-medium',
        medium: 'w-[212px] h-[46px] rounded-xl text-label-large',
        jumbo: 'w-full h-[48px] rounded-[12px] text-body-1-normal',
        large: 'w-full h-[58px] rounded-2xl text-title-small-1',
      },
      solidType: {
        primary: 'bg-primary-500',
        secondary: 'bg-primary-600',
        tertiary: 'bg-primary-400',
        disabled: 'bg-gray-500 text-gray-100',
      },
      outlineType: {
        primary: 'border-primary-400 text-primary-400',
        secondary: 'border-primary-600 text-primary-600',
        tertiary: 'border-primary-400 text-primary-400',
        disabled: 'border-gray-400 text-gray-400',
      },
      borderSize: {
        small: 'border-[1.5px]',
        medium: 'border-[1.8px]',
        jumbo: 'border-[2px]',
        large: 'border-[2px]',
      },
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  buttonType: 'primary' | 'secondary' | 'tertiary' | 'disabled';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      buttonType,
      asChild = false,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    const type =
      variant === 'solid'
        ? buttonVariants({ solidType: buttonType })
        : buttonVariants({ outlineType: buttonType, borderSize: size });

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), type, className)}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

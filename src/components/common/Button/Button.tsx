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
        small: 'w-[157px] h-[40px]  rounded-lg text-label-medium',
        medium: 'w-[212px] h-[48px]  rounded-xl text-title-small',
        large: 'w-full h-[63px] rounded-2xl text-title-medium',
      },
      solidType: {
        primary: 'bg-primary-400',
        secondary: 'bg-primary-600 ',
        disabled: 'bg-gray-500 text-gray-100',
      },
      outlineType: {
        primary: 'border-primary-400 text-primary-400',
        secondary: 'border-primary-600 text-primary-600',
        disabled: 'border-gray-400 text-gray-400',
      },
      borderSize: {
        small: 'border-[1.5px]',
        medium: 'border-[1.8px]',
        large: 'border-[2px]',
      },
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  buttonType: 'primary' | 'secondary' | 'disabled';
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

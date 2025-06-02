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
        small: 'w-[160px] h-[40px] rounded-lg text-label-1',
        medium: 'w-[210px] h-[46px] rounded-xl text-headline-3',
        large: 'w-full h-[58px] rounded-2xl text-heading-2',
        jumbo: 'w-full h-[1px]',
      },
      solidType: {
        primary: 'bg-primary-500 text-gray-100',
        secondary: 'bg-primary-700 text-gray-100',
        disabled: 'bg-gray-400 text-gray-100',
        tertiary: 'bg-gray-100',
      },
      outlineType: {
        primary: 'border-primary-500 text-primary-600',
        secondary: 'border-primary-700 text-primary-700',
        disabled: 'border-gray-500 text-gray-600',
        tertiary: 'bg-gray-100',
      },
      borderSize: {
        small: 'border-[1.5px]',
        medium: 'border-[1.8px]',
        large: 'border-[2px]',
        jumbo: 'border-[1px]',
      },
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  buttonType: 'primary' | 'secondary' | 'disabled' | 'tertiary';
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
      onClick,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    const type =
      variant === 'solid'
        ? buttonVariants({ solidType: buttonType })
        : buttonVariants({ outlineType: buttonType, borderSize: size });

    const disabled = buttonType === 'disabled';

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          type,
          buttonType === 'disabled' && 'cursor-not-allowed',
          className,
        )}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

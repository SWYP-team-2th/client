import React from 'react';
import { cn } from '@/utils/cn';

interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  value?: string;
  variant: 'outlined' | 'solid';
  label?: string;
  rightNode?: React.ReactNode;
  inlineMessage?: string;
  status?: 'error' | 'success' | 'default';
  showLengthIndicator?: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      value,
      variant,
      label,
      rightNode,
      status = 'default',
      inlineMessage,
      showLengthIndicator,
      maxLength,
      className,
      ...restProps
    },
    ref,
  ) => {
    return (
      <div
        className={cn('flex flex-col gap-1 text-gray-700', {
          'text-error': status === 'error',
          'text-success': status === 'success',
        })}
      >
        <label className="text-body-2-long">{label}</label>
        <div className="relative">
          <input
            className={cn(
              'w-full px-4 py-3 rounded-xl border-[1px] border-gray-500 border-solid text-body-1-long text-gray-700 [&:hover]:text-gray-800 focus:outline-none',
              {
                'border-success':
                  status === 'success' && variant === 'outlined',
                'border-error': status === 'error' && variant === 'outlined',
                'bg-success-100': status === 'success',
                'bg-error-100': status === 'error',
                'bg-gray-300': status === 'default' && variant === 'solid',
                'border-none': variant === 'solid',
                'pr-12': rightNode,
              },
              className,
            )}
            ref={ref}
            type="text"
            {...restProps}
          />
          {rightNode && (
            <div className="absolute top-3 right-3 w-6 h-6">{rightNode}</div>
          )}
        </div>
        <div className="text-caption flex justify-between">
          {inlineMessage && <p className="flex-1">{inlineMessage}</p>}
          {showLengthIndicator && (
            <p className="ml-auto">
              {value?.length ?? 0} / {maxLength}
            </p>
          )}
        </div>
      </div>
    );
  },
);

export default TextInput;

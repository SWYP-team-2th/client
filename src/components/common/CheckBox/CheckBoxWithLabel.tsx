import Icon from '../Icon/Icon';
import { cn } from '@/utils/cn';

interface CheckBoxProps {
  id: string;
  size: 'large' | 'small';
  checked: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const sizeMap = {
  large: 'w-[18px] h-[18px]',
  small: 'w-4 h-4',
};

export default function CheckBoxWithLabel({
  id,
  checked,
  onChange,
  size,
  disabled = false,
  readOnly = false,
  label,
}: CheckBoxProps) {
  return (
    <div
      className={cn(
        'flex items-center cursor-pointer',
        readOnly && 'cursor-default',
        disabled && 'cursor-not-allowed',
      )}
    >
      {!readOnly && (
        <span
          className={cn(
            'relative inline-flex items-center justify-center border-2 rounded transition-colors mr-[10px]',
            sizeMap[size],
            checked
              ? 'bg-primary-500 border-primary-500'
              : 'bg-gray-100 border-gray-400',
          )}
        >
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="absolute w-full h-full opacity-0"
          />
          {checked && (
            <Icon
              name={size === 'large' ? 'CheckLarge' : 'CheckSmall'}
              size={size === 'large' ? 'large' : 'small'}
            />
          )}
        </span>
      )}

      <label
        htmlFor={id}
        className={cn('text-body-1', disabled && 'text-gray-400')}
      >
        {label}
      </label>
    </div>
  );
}

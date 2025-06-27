import Icon from '../Icon/Icon';
import { cn } from '@/utils/cn';

interface CheckBoxProps {
  id?: number;
  size: 'large' | 'small';
  checked: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  label?: string;
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
  const stringId = id?.toString();

  return (
    <div
      className={cn(
        'flex items-center cursor-pointer',
        readOnly ? 'cursor-default' : 'cursor-pointer',
        disabled ? 'cursor-not-allowed' : '',
      )}
    >
      {!readOnly && (
        <span
          className={cn(
            'relative inline-flex items-center justify-center border-2 rounded transition-colors mr-[10px]',
            sizeMap[size],
            checked
              ? 'bg-primary-900 border-primary-900'
              : 'bg-gray-100 border-gray-400',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          )}
        >
          <input
            id={stringId}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="absolute w-full h-full opacity-0 cursor-pointer"
          />
          {checked && (
            <Icon
              name={size === 'large' ? 'CheckLarge' : 'CheckSmall'}
              size={size === 'large' ? 'large' : 'small'}
            />
          )}
        </span>
      )}
      {label && (
        <label
          htmlFor={stringId}
          className={cn(
            'text-body-1 cursor-pointer',
            readOnly ? 'cursor-default' : 'cursor-pointer',
            disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900',
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
}

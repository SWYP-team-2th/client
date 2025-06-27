import Icon from '../Icon/Icon';
import { cn } from '@/utils/cn';

interface CheckBoxProps {
  size: 'large' | 'small';
  checked: boolean;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const sizeMap = {
  large: 'w-[18px] h-[18px]',
  small: 'w-4 h-4',
};

export default function CheckBox({
  checked,
  onChange,
  size,
  disabled = false,
}: CheckBoxProps) {
  return (
    <div className="flex items-center cursor-pointer">
      <span
        className={cn(
          'relative inline-flex items-center justify-center border-2 rounded transition-colors',
          sizeMap[size],
          checked
            ? 'bg-primary-900 border-primary-900'
            : 'bg-gray-100 border-gray-400',
          disabled ? 'cursor-not-allowed' : '',
        )}
      >
        <input
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
    </div>
  );
}

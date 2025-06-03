import RadioButton from '../RadioButton';
import { cn } from '@/utils/cn';

export interface RadioOption {
  value: string;
  label?: string;
  disabled?: boolean;
  Content?: React.ReactNode;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string | null;
  onChange: (value: string) => void;
  size?: 'medium' | 'small';
  name?: string;
  direction?: 'vertical' | 'horizontal';
  className?: string;
}

export default function RadioGroup({
  options,
  value,
  onChange,
  size = 'medium',
  name,
  direction = 'vertical',
  className,
}: RadioGroupProps) {
  return (
    <div
      className={cn(
        'flex',
        direction === 'vertical' ? 'flex-col space-y-4' : 'flex-row space-x-4',
        className,
      )}
      role="radiogroup"
    >
      {options.map((option) => (
        <div key={option.value}>
          <RadioButton
            value={option.value}
            label={option.label}
            checked={value === option.value}
            onChange={onChange}
            disabled={option.disabled}
            size={size}
            name={name}
          />
          {option.value === value && option.Content && (
            <div
              className={cn(
                'mt-2',
                size === 'medium' && 'ml-[26px]',
                size === 'small' && 'ml-[22px]',
              )}
            >
              {option.Content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

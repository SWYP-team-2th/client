import RadioButton from '../RadioButton';
import { cn } from '@/utils/cn';

export interface RadioOption {
  value: string;
  label?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
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
        direction === 'vertical' ? 'flex-col space-y-2' : 'flex-row space-x-4',
        className,
      )}
      role="radiogroup"
    >
      {options.map((option) => (
        <RadioButton
          key={option.value}
          value={option.value}
          label={option.label}
          checked={value === option.value}
          onChange={onChange}
          disabled={option.disabled}
          size={size}
          name={name}
        />
      ))}
    </div>
  );
}

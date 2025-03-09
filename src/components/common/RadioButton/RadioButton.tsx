import { cn } from '@/utils/cn';

interface RadioButtonProps {
  size?: 'medium' | 'small';
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  value: string;
  name?: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function RadioButton({
  size = 'medium',
  checked = false,
  label,
  disabled = false,
  value,
  name,
  onChange,
  className,
}: RadioButtonProps) {
  const handleChange = () => {
    if (disabled) return;
    onChange(value);
  };

  const radioBtnClasses = {
    container: cn(
      'flex items-center',
      disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      className,
    ),
    radio: {
      wrapper: cn(
        'relative flex items-center justify-center rounded-full border m-[2px]',
        disabled
          ? 'border-gray-400'
          : checked
            ? 'bg-secondary-700'
            : 'border-gray-600',
        size === 'medium' ? 'w-[18px] h-[18px]' : 'w-[14px] h-[14px]',
      ),
      dot: cn(
        'rounded-full bg-gray-100',
        checked ? 'opacity-100' : 'opacity-0',
        size === 'medium' ? 'w-[10px] h-[10px]' : 'w-[8px] h-[8px]',
      ),
    },
    label: cn('ml-1 text-sm', disabled ? 'text-gray-500' : 'text-gray-700'),
  };

  return (
    <label className={radioBtnClasses.container}>
      <input
        type="radio"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        value={value}
        name={name}
        onChange={handleChange}
      />
      <div className={radioBtnClasses.radio.wrapper}>
        <span className={radioBtnClasses.radio.dot} />
      </div>
      {label && <span className={radioBtnClasses.label}>{label}</span>}
    </label>
  );
}

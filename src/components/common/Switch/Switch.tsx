import { cn } from '@/utils/cn';

interface SwitchProps {
  size?: 'medium' | 'small';
  disabled?: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  name?: string;
  value?: string;
}

export default function Switch({
  size = 'medium',
  disabled = false,
  checked = false,
  onChange,
  className,
  name,
  value,
}: SwitchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange(e.target.checked);
  };

  const containerClasses = {
    base: 'relative inline-flex items-center rounded-full transition-colors focus:outline-none',
    size: {
      medium: 'h-[31px] w-[51px]',
      small: 'h-[25px] w-[41px]',
    },
    active: {
      on: 'bg-secondary-500',
      off: 'bg-gray-400',
    },
    disabled: 'opacity-40 cursor-not-allowed',
  };

  const sliderClasses = {
    base: 'absolute transform transition-transform rounded-full bg-white',
    size: {
      medium: 'h-[27px] w-[27px]',
      small: 'h-[21px] w-[21px]',
    },
    position: {
      on: {
        medium: 'translate-x-[22px]',
        small: 'translate-x-[18px]',
      },
      off: 'translate-x-[2px]',
    },
    shadow:
      'after:content-[""] after:absolute after:inset-0 after:rounded-full after:shadow-[0_3px_0.5px_rgba(0,0,0,0.06),0_3px_4px_rgba(0,0,0,0.15)]',
  };

  return (
    <label
      className={cn(
        containerClasses.base,
        containerClasses.size[size],
        checked ? containerClasses.active.on : containerClasses.active.off,
        disabled ? containerClasses.disabled : 'cursor-pointer',
        className,
      )}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        value={value}
        name={name}
      />
      <span
        className={cn(
          sliderClasses.base,
          sliderClasses.size[size],
          checked
            ? sliderClasses.position.on[size]
            : sliderClasses.position.off,
          sliderClasses.shadow,
          'relative overflow-hidden',
        )}
      />
    </label>
  );
}

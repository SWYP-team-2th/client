import RadioButton from './RadioButton';
import { cn } from '@/utils/cn';

export interface RadioOption {
  value: string;
  label?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  /**
   * 라디오 그룹의 옵션들
   */
  options: RadioOption[];

  /**
   * 현재 선택된 값
   */
  value: string;

  /**
   * 값 변경 시 호출되는 함수
   */
  onChange: (value: string) => void;

  /**
   * 라디오 버튼 크기
   */
  size?: 'medium' | 'small';

  /**
   * 라디오 그룹 이름
   */
  name?: string;

  /**
   * 수직 정렬 여부 (기본: 수직)
   */
  direction?: 'vertical' | 'horizontal';

  /**
   * 전체 그룹 비활성화 여부
   */
  disabled?: boolean;

  /**
   * 추가 클래스
   */
  className?: string;
}

/**
 * 여러 라디오 버튼을 그룹으로 관리하는 컴포넌트
 */
export default function RadioGroup({
  options,
  value,
  onChange,
  size = 'medium',
  name,
  direction = 'vertical',
  disabled = false,
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
      aria-disabled={disabled}
    >
      {options.map((option) => (
        <RadioButton
          key={option.value}
          value={option.value}
          label={option.label}
          checked={value === option.value}
          onChange={onChange}
          disabled={disabled || option.disabled}
          size={size}
          name={name}
        />
      ))}
    </div>
  );
}

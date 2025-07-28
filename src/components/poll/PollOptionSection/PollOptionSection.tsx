import usePollOptionSection from './hooks';
import FieldContainer from '../../poll/FieldContainer';
import Switch from '@/components/common/Switch';

export default function PollOptionSection() {
  const { POLL_OPTIONS } = usePollOptionSection();

  return (
    <FieldContainer title="투표 설정" className="flex flex-col gap-5">
      {POLL_OPTIONS.filter((option) => option.visible).map((option) => (
        <div
          key={option.value}
          className="flex items-center justify-between text-gray-900 text-headline-2"
        >
          <p>{option.label}</p>
          <Switch
            size="medium"
            checked={option.checked}
            onChange={(value) => option.onChange(value)}
          />
        </div>
      ))}
    </FieldContainer>
  );
}

import usePollChoiceInformation from './hooks';
import Icon from '@/components/common/Icon';

export default function PollChoiceInformation() {
  const { addPollChoice, isPollChoiceFull } = usePollChoiceInformation();
  return (
    <div className="flex flex-col justify-center items-center">
      {!isPollChoiceFull && (
        <button
          className="flex items-center gap-[6px] text-gray-600 text-headline-3 cursor-pointer"
          onClick={addPollChoice}
        >
          <Icon size="small" name="Plus" className="text-gray-600" />
          <span>선택지 추가하기</span>
        </button>
      )}
    </div>
  );
}

import { Reorder } from 'motion/react';
import usePollChoiceInformation from './hooks';
import PollChoice from './PollChoice';
import Icon from '@/components/common/Icon';

export default function PollChoiceInformation() {
  const { pollChoices, addPollChoice, isPollChoiceFull } =
    usePollChoiceInformation();
  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <Reorder.Group
        className="flex flex-col gap-3 w-full"
        values={pollChoices.map((choice) => choice.order)}
        onReorder={(newOrder) => {
          console.log(newOrder);
        }}
      >
        {pollChoices.map((choice) => (
          <PollChoice key={choice.order} choice={choice} />
        ))}
      </Reorder.Group>
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

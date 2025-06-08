import { Reorder } from 'motion/react';
import usePollChoice from './hooks';
import type { PollChoice } from '@/components/vote-regist/Provider/types';
import Icon from '@/components/common/Icon';
import { IMAGE_TITLE_PLACEHOLDER } from '@/components/vote-regist/Provider/constants';
import { cn } from '@/utils/cn';

interface PollChoiceProps {
  choice: PollChoice;
}

export default function PollChoice({ choice }: PollChoiceProps) {
  const {
    dragControls,
    setPollChoiceImage,
    setPollChoiceTitle,
    fileInputRef,
    handleClickImageButton,
  } = usePollChoice();

  return (
    <Reorder.Item
      className="bg-white flex pl-2 pr-4 py-2 justify-between items-center w-full h-[96px] border border-gray-300 rounded-xl"
      value={choice.order}
      dragListener={false}
      dragControls={dragControls}
    >
      <div className="flex items-center gap-3">
        <div onClick={handleClickImageButton} className="cursor-pointer">
          {choice.imageUrl ? (
            <img
              src={choice.imageUrl}
              alt={choice.title}
              className="rounded-lg object-cover w-20 h-20 overflow-hidden"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-400 rounded-lg flex items-center justify-center">
              <Icon name="PhotoPlusWhite" size="large" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setPollChoiceImage(
                  choice.order,
                  URL.createObjectURL(e.target.files[0]),
                );
              }
            }}
          />
        </div>
        <input
          type="text"
          className={cn(
            'focus:outline-none text-headline-3',
            choice.title ===
              IMAGE_TITLE_PLACEHOLDER[
                choice.order as keyof typeof IMAGE_TITLE_PLACEHOLDER
              ] && 'text-gray-400',
          )}
          value={choice.title}
          onChange={(e) => {
            setPollChoiceTitle(choice.order, e.target.value);
          }}
        />
      </div>
      <Icon
        size="medium"
        name="Menu"
        onPointerDown={(e) => dragControls.start(e)}
      />
    </Reorder.Item>
  );
}

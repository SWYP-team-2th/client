import { Reorder, motion } from 'motion/react';
import usePollChoice from './hooks';
import type { PollChoice } from '@/components/poll/Provider/types';
import Icon from '@/components/common/Icon';
import Loading from '@/components/common/Loading';
import { IMAGE_TITLE_PLACEHOLDER } from '@/components/poll/Provider/constants';
import { cn } from '@/utils/cn';

interface PollChoiceProps {
  choice: PollChoice;
}

export default function PollChoice({ choice }: PollChoiceProps) {
  const {
    dragControls,
    setPollChoiceTitle,
    fileInputRef,
    handleClickImageButton,
    handleFileChange,
    handleDelete,
    isDeleteOpen,
    isUploading,
    x,
    controls,
  } = usePollChoice(choice.id);

  return (
    <Reorder.Item
      className="w-full"
      value={choice.order}
      dragListener={false}
      dragControls={dragControls}
    >
      <div className="relative w-full">
        <motion.div
          drag="x"
          dragConstraints={{ left: -80, right: 0 }}
          style={{ x }}
          animate={controls}
          className="bg-white flex pl-2 pr-4 py-2 justify-between items-center w-full h-[96px] border border-gray-300 rounded-xl z-10"
        >
          <div className="flex items-center gap-3">
            <div onClick={handleClickImageButton} className="cursor-pointer">
              {isUploading ? (
                <div className="w-20 h-20 bg-gray-400 rounded-lg flex items-center justify-center">
                  <Loading className="w-10 h-10" />
                </div>
              ) : choice.imageUrl ? (
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
                multiple
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files) {
                    const files = Array.from(e.target.files);
                    handleFileChange(files);
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
              onKeyDown={(e) => {
                const placeholderValue =
                  IMAGE_TITLE_PLACEHOLDER[
                    choice.order as keyof typeof IMAGE_TITLE_PLACEHOLDER
                  ];

                if (choice.title === placeholderValue) {
                  if (e.key === 'Backspace' || e.key === 'Delete') {
                    e.preventDefault();
                    setPollChoiceTitle(choice.id, '');
                  } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
                    setPollChoiceTitle(choice.id, '');
                  }
                }
              }}
              onBlur={() => {
                const placeholderValue =
                  IMAGE_TITLE_PLACEHOLDER[
                    choice.order as keyof typeof IMAGE_TITLE_PLACEHOLDER
                  ];
                if (choice.title.trim() === '') {
                  setPollChoiceTitle(choice.id, placeholderValue);
                }
              }}
              onChange={(e) => {
                const placeholderValue =
                  IMAGE_TITLE_PLACEHOLDER[
                    choice.order as keyof typeof IMAGE_TITLE_PLACEHOLDER
                  ];
                const newValue = e.target.value;

                if (newValue.trim() === '') {
                  setPollChoiceTitle(choice.id, placeholderValue);
                } else {
                  setPollChoiceTitle(choice.id, newValue);
                }
              }}
            />
          </div>
          <Icon
            size="medium"
            name="Menu"
            onPointerDown={(e) => {
              e.preventDefault();
              dragControls.start(e);
            }}
            tabIndex={-1}
          />
        </motion.div>
        {isDeleteOpen && (
          <button
            className="w-[40px] flex items-center justify-center h-[40px] absolute right-4 rounded-full top-1/2 -translate-y-1/2 z-50 bg-red-500 text-white"
            onClick={handleDelete}
          >
            <Icon name="Trash" size="medium" />
          </button>
        )}
      </div>
    </Reorder.Item>
  );
}

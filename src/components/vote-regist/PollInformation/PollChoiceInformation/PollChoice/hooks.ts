import { useDragControls } from 'motion/react';
import { useRef } from 'react';
import usePollRegist from '@/components/vote-regist/Provider/hooks';

export default function usePollChoice() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragControls = useDragControls();
  const { setPollChoiceTitle, setPollChoiceImage } = usePollRegist();

  const handleClickImageButton = () => {
    fileInputRef.current?.click();
  };

  return {
    dragControls,
    setPollChoiceTitle,
    setPollChoiceImage,
    fileInputRef,
    handleClickImageButton,
  };
}

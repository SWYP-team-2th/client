import { useDragControls } from 'motion/react';
import usePollRegist from '@/components/vote-regist/Provider/hooks';

export default function usePollChoice() {
  const dragControls = useDragControls();
  const { setPollChoiceTitle } = usePollRegist();

  return {
    dragControls,
    setPollChoiceTitle,
  };
}

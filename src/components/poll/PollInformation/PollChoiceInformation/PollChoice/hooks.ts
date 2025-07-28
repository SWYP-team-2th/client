import { useMotionValue, useAnimation } from 'framer-motion';
import { useDragControls } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import usePollForm from '@/components/poll/Provider/hooks';

export default function usePollChoice(id: string) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragControls = useDragControls();
  const { setPollChoiceTitle, deletePollChoice, addPollChoices } =
    usePollForm();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleClickImageButton = () => {
    fileInputRef.current?.click();
  };

  const x = useMotionValue(0);
  const controls = useAnimation();

  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      if (latest <= -80) {
        setIsDeleteOpen(true);
      } else {
        setIsDeleteOpen(false);
      }
    });
    return () => unsubscribe();
  }, [x]);

  const handleDelete = () => {
    setIsDeleteOpen(false);
    deletePollChoice(id);
  };

  return {
    dragControls,
    setPollChoiceTitle,
    addPollChoices,
    fileInputRef,
    handleClickImageButton,
    handleDelete,
    x,
    controls,
    isDeleteOpen,
    setIsDeleteOpen,
  };
}

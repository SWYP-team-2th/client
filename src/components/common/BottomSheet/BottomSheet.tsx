import { motion } from 'motion/react';
import Icon from '../Icon';
import { useBottomSheet } from './hooks';

interface BottomSheetProps {
  title: string;
  hasCloseButton?: boolean;
  children: React.ReactNode;
}

export default function BottomSheet({
  title,
  hasCloseButton = false,
  children,
}: BottomSheetProps) {
  const { closeBottomSheet } = useBottomSheet();

  return (
    <motion.div
      initial={{ y: '100%', opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="pt-[24px] pb-[24px] pl-[32px] pr-[32px] rounded-t-2xl relative w-full max-w-[480px] bg-gray-100"
    >
      <h3 className="text-heading-1 pb-8 border-gray-400">{title}</h3>
      {hasCloseButton && (
        <button
          className="absolute top-[24px] right-[24px]"
          onClick={closeBottomSheet}
        >
          <Icon name="CrossGray" size="large" />
        </button>
      )}
      <div>{children}</div>
    </motion.div>
  );
}

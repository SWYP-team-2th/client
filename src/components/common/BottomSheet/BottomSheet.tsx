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
      className="pt-[24px] pb-[36px] rounded-t-2xl relative w-full max-w-[480px] bg-gray-100"
    >
      <h1 className="pl-5 text-headline-1 pb-5 border-gray-400">{title}</h1>
      {hasCloseButton && (
        <button
          className="absolute top-[24px] right-[24px]"
          onClick={closeBottomSheet}
        >
          <Icon name="CrossGray" size="medium" />
        </button>
      )}
      <hr className="border-gray-200" />
      <div>{children}</div>
    </motion.div>
  );
}

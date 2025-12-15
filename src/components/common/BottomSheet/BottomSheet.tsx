import { motion } from 'motion/react';
import Icon from '../Icon';
import { useBottomSheet } from './hooks';

type BottomSheetVariant = 'left' | 'center';

interface BottomSheetProps {
  title: string;
  description?: string;
  topContent?: React.ReactNode;
  variant?: BottomSheetVariant;
  hasCloseButton?: boolean;
  children: React.ReactNode;
}

export default function BottomSheet({
  title,
  description,
  topContent,
  variant = 'default',
  hasCloseButton = false,
  children,
}: BottomSheetProps) {
  const { closeBottomSheet } = useBottomSheet();

  const isCentered = variant === 'centered';

  const renderHeader = () =>
    isCentered ? (
      <div className="flex flex-col items-center text-center px-6 pb-7">
        {topContent && <div className="mb-4">{topContent}</div>}
        <h1 className="text-heading-1 mb-3">{title}</h1>
        {description && (
          <p className="text-headline-1 text-gray-500">{description}</p>
        )}
      </div>
    ) : (
      <h1 className="pl-5 text-headline-1 pb-5 border-gray-400">{title}</h1>
    );

  return (
    <motion.div
      initial={{ y: '100%', opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="pt-[24px] pb-[36px] rounded-t-2xl relative w-full max-w-[480px] bg-gray-100"
    >
      {renderHeader()}

      {hasCloseButton && (
        <button
          className="absolute top-[24px] right-[24px]"
          onClick={closeBottomSheet}
        >
          <Icon name="Cross" size="large" />
        </button>
      )}

      <div>{children}</div>
    </motion.div>
  );
}

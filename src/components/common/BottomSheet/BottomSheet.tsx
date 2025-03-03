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
    <div className="py-[28px] rounded-t-2xl relative w-full max-w-[480px] bg-gray-100">
      <h3 className="px-10 text-h3 pb-4 border-b-[1px] border-gray-400">
        {title}
      </h3>
      {hasCloseButton && (
        <button
          className="absolute top-[10px] right-[10px]"
          onClick={closeBottomSheet}
        >
          <Icon name="Cross" size="large" />
        </button>
      )}
      <div className="pt-4 px-10">{children}</div>
    </div>
  );
}

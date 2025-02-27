import { useContext } from 'react';
import { BottomSheetContext } from './BottomSheetProvider';

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);

  if (!context) {
    throw new Error(
      'useBottomSheet는 BottomSheetProvider 내부에서 사용해야 합니다.',
    );
  }

  return {
    openBottomSheet: (bottomSheet: React.ReactNode) =>
      context.openBottomSheet(bottomSheet),
    closeBottomSheet: () => context.closeBottomSheet(),
  };
};

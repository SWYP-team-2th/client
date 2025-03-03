import { createContext, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import Overlay from '../Overlay';

interface BottomSheetContextType {
  openBottomSheet: (bottomSheet: React.ReactNode) => void;
  closeBottomSheet: () => void;
}

export const BottomSheetContext = createContext<BottomSheetContextType | null>(
  null,
);

export const BottomSheetProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentBottomSheet, setCurrentBottomSheet] =
    useState<React.ReactNode | null>(null);

  const openBottomSheet = useCallback((bottomSheet: React.ReactNode) => {
    setCurrentBottomSheet(bottomSheet);
  }, []);

  const closeBottomSheet = useCallback(() => {
    setCurrentBottomSheet(null);
  }, []);

  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      {children}
      {createPortal(
        currentBottomSheet && (
          <Overlay onClose={closeBottomSheet}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px]">
              {currentBottomSheet}
            </div>
          </Overlay>
        ),
        document.body,
      )}
    </BottomSheetContext.Provider>
  );
};

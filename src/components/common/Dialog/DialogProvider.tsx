import { createContext, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import Overlay from '@/components/common/Overlay';

interface DialogContextType {
  openDialog: (dialog: React.ReactNode) => void;
  closeDialog: () => void;
}

export const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentDialog, setCurrentDialog] = useState<React.ReactNode | null>(
    null,
  );

  const openDialog = useCallback((dialog: React.ReactNode) => {
    setCurrentDialog(dialog);
  }, []);

  const closeDialog = useCallback(() => {
    setCurrentDialog(null);
  }, []);

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      {createPortal(
        currentDialog && (
          <Overlay onClose={closeDialog}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[480px]">
              {currentDialog}
            </div>
          </Overlay>
        ),
        document.body,
      )}
    </DialogContext.Provider>
  );
};

import { createContext, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { Overlay } from '@/components/common/Overlay/Overlay';

interface DialogContextType {
  open: (dialog: React.ReactNode) => void;
  close: () => void;
}

export const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentDialog, setCurrentDialog] = useState<React.ReactNode | null>(
    null,
  );

  const open = useCallback((dialog: React.ReactNode) => {
    setCurrentDialog(dialog);
  }, []);

  const close = useCallback(() => {
    setCurrentDialog(null);
  }, []);

  return (
    <DialogContext.Provider value={{ open, close }}>
      {children}
      {createPortal(
        currentDialog && (
          <Overlay onClose={close}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {currentDialog}
            </div>
          </Overlay>
        ),
        document.body,
      )}
    </DialogContext.Provider>
  );
};

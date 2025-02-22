import { createContext, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

interface DialogContextType {
  open: (dialog: React.ReactNode) => void;
  close: () => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

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
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50" onClick={close} />
            <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {currentDialog}
            </div>
          </div>
        ),
        document.body,
      )}
    </DialogContext.Provider>
  );
};

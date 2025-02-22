import { createContext, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import Toast from './Toast';
import { ToastProps } from './types';

interface Toast extends ToastProps {
  id: string;
}

interface ToastContextType {
  showToast: (toast: ToastProps) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: ToastProps) => {
    const newToast = { ...toast, id: crypto.randomUUID() };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(newToast.id);
    }, 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {createPortal(
        <div className="fixed top-10 left-1/2 -translate-x-1/2 flex flex-col gap-4 max-w-[430px] w-full">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

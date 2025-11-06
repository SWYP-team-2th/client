import {
  createContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';
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

let globalToastContext: ToastContextType | null = null;

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutIdsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    const timeoutId = timeoutIdsRef.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutIdsRef.current.delete(id);
    }
  }, []);

  const showToast = useCallback((toast: ToastProps) => {
    const newToast = { ...toast, id: crypto.randomUUID() };
    setToasts((prev) => [...prev, newToast]);

    const timeoutId = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      timeoutIdsRef.current.delete(newToast.id);
    }, 3000);

    timeoutIdsRef.current.set(newToast.id, timeoutId);
  }, []);

  const contextValue = useMemo(
    () => ({ showToast, removeToast }),
    [showToast, removeToast],
  );

  useEffect(() => {
    globalToastContext = contextValue;
    return () => {
      globalToastContext = null;
    };
  }, [contextValue]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {createPortal(
        <div className="fixed top-10 left-1/2 -translate-x-1/2 flex flex-col gap-4 max-w-[430px] w-full z-100">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

export const getGlobalToastContext = () => globalToastContext;

import { useContext } from 'react';
import { ToastContext } from './ToastProvider';
import { ToastProps } from './types';

export default function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast는 ToastProvider 내부에서 사용해야 합니다.');
  }

  return {
    success: ({ title, description, ...options }: Omit<ToastProps, 'type'>) =>
      context.showToast({ title, description, type: 'success', ...options }),
    error: ({ title, description, ...options }: Omit<ToastProps, 'type'>) =>
      context.showToast({ title, description, type: 'error', ...options }),
    warning: ({ title, description, ...options }: Omit<ToastProps, 'type'>) =>
      context.showToast({ title, description, type: 'warning', ...options }),
    info: ({ title, description, ...options }: Omit<ToastProps, 'type'>) =>
      context.showToast({ title, description, type: 'info', ...options }),
  };
}

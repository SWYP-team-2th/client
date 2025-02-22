export interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
}

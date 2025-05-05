export interface ToastProps {
  type: 'default' | 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
}

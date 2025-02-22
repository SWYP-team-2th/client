import Icon from '../Icon';
import { ToastProps } from './types';

export default function Toast({ type, title, description }: ToastProps) {
  return (
    <div className="px-8 py-4 rounded-2xl bg-[rgba(0,0,0,0.6)] w-full h-[100px] flex gap-6 items-center">
      {type === 'success' && <Icon name="ToastSuccess" size="large" />}
      {type === 'error' && <Icon name="ToastError" size="large" />}
      {type === 'warning' && <Icon name="ToastWarning" size="large" />}
      {type === 'info' && <Icon name="ToastInfo" size="large" />}
      <div className="text-gray-100">
        <h3 className="text-title-medium">{title}</h3>
        <p className="text-body-1-long whitespace-pre-wrap">{description}</p>
      </div>
    </div>
  );
}

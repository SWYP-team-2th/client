import Icon from '../Icon';
import { ToastProps } from './types';

export default function Toast({ type, title, description }: ToastProps) {
  return (
    <div className="px-8 py-4 rounded-2xl bg-[rgba(0,0,0,0.6)] w-full h-[100px] flex gap-6 items-center">
      {type === 'success' && (
        <Icon name="ToastSuccess" width={32} height={32} />
      )}
      {type === 'error' && <Icon name="ToastError" width={32} height={32} />}
      {type === 'warning' && (
        <Icon name="ToastWarning" width={32} height={32} />
      )}
      {type === 'info' && <Icon name="ToastInfo" width={32} height={32} />}
      <div className="text-gray-100">
        <h3 className="text-title-medium">{title}</h3>
        <p className="text-body-1-long whitespace-pre-wrap">{description}</p>
      </div>
    </div>
  );
}

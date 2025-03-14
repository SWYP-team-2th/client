import Icon from '../Icon';
import { ToastProps } from './types';

export default function Toast({ type, title, description }: ToastProps) {
  return (
    <div className="px-8 py-3 rounded-2xl bg-[rgba(0,0,0,0.6)] w-full flex gap-4 items-center">
      {type === 'success' && <Icon name="ToastSuccess" size="large" />}
      {type === 'error' && <Icon name="ToastError" size="large" />}
      {type === 'warning' && <Icon name="ToastWarning" size="large" />}
      {type === 'info' && <Icon name="ToastInfo" size="large" />}
      <div className="flex flex-col gap-1">
        <h3 className="text-title-small-1 text-gray-100">{title}</h3>
        {description && (
          <p className="text-body-2-long whitespace-pre-wrap text-gray-300">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

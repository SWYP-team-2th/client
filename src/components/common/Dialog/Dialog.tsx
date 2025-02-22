import { useDialog } from './hooks';
import { Button } from '@/components/common/Button/Button';

interface DialogProps {
  title: string;
  description?: string;
  cancelButtonProps?: {
    text: string;
  };
  confirmButtonProps: {
    text: string;
    onClick: () => void;
  };
  showLaterButton: boolean;
}

export default function Dialog({
  title,
  description,
  cancelButtonProps,
  confirmButtonProps,
  showLaterButton,
}: DialogProps) {
  const { close } = useDialog();

  return (
    <div className="px-7 py-8 rounded-2xl flex flex-col gap-4 justify-center items-center text-center w-full max-w-[430px] bg-gray-100">
      <div className="flex flex-col gap-2">
        <h2 className="text-h2">{title}</h2>
        <p className="text-body-1-long">{description}</p>
      </div>
      {cancelButtonProps && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="small"
            buttonType="primary"
            onClick={close}
          >
            {cancelButtonProps.text}
          </Button>
          <Button
            variant="solid"
            size="small"
            buttonType="primary"
            onClick={confirmButtonProps.onClick}
          >
            {confirmButtonProps.text}
          </Button>
        </div>
      )}
      {!cancelButtonProps && (
        <Button variant="solid" size="large" buttonType="primary">
          {confirmButtonProps.text}
        </Button>
      )}
      {showLaterButton && (
        <button
          onClick={close}
          className="underline text-gray-700 cursor-pointer"
        >
          나중에 하기
        </button>
      )}
    </div>
  );
}

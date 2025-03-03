import Icon from '../Icon';
import Loading from '../Loading';
import { useDialog } from './hooks';
import { Button } from '@/components/common/Button/Button';

interface DialogProps {
  title: React.ReactNode;
  description?: string;
  hasCloseButton?: boolean;
  cancelButtonProps?: {
    text: string;
    isLoading?: boolean;
  };
  confirmButtonProps?: {
    text: string;
    onClick: () => void;
    isLoading?: boolean;
  };
  customButtonProps?: React.ReactNode;
  showLaterButton: boolean;
  inlineMessage?: string;
}

export default function Dialog({
  title,
  description,
  hasCloseButton = false,
  cancelButtonProps,
  confirmButtonProps,
  showLaterButton,
  customButtonProps,
  inlineMessage,
}: DialogProps) {
  const { closeDialog } = useDialog();

  return (
    <div className="relative px-7 py-8 rounded-2xl flex flex-col gap-4 justify-center items-center text-center w-full max-w-[430px] bg-gray-100">
      <div className="flex flex-col gap-2 break-keep">
        <h2 className="text-title-large">{title}</h2>
        <p className="text-body-1-long text-gray-700">{description}</p>
      </div>
      {hasCloseButton && (
        <button
          className="absolute top-[10px] right-[10px] cursor-pointer"
          onClick={closeDialog}
        >
          <Icon name="Cross" size="large" />
        </button>
      )}
      {cancelButtonProps && confirmButtonProps && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="small"
            buttonType="primary"
            onClick={closeDialog}
          >
            {cancelButtonProps.isLoading ? <Loading /> : cancelButtonProps.text}
          </Button>
          <Button
            variant="solid"
            size="small"
            buttonType={confirmButtonProps.isLoading ? 'disabled' : 'primary'}
            onClick={confirmButtonProps.onClick}
          >
            {confirmButtonProps.isLoading ? (
              <Loading />
            ) : (
              confirmButtonProps.text
            )}
          </Button>
        </div>
      )}
      {!cancelButtonProps && confirmButtonProps && (
        <Button
          variant="solid"
          size="large"
          buttonType={confirmButtonProps.isLoading ? 'disabled' : 'primary'}
          onClick={confirmButtonProps.onClick}
        >
          {confirmButtonProps.isLoading ? <Loading /> : confirmButtonProps.text}
        </Button>
      )}
      {showLaterButton && (
        <button
          onClick={closeDialog}
          className="underline text-gray-700 cursor-pointer"
        >
          나중에 하기
        </button>
      )}
      {customButtonProps && customButtonProps}
      {inlineMessage && (
        <p className="text-label-xsmall-2 text-gray-600">{inlineMessage}</p>
      )}
    </div>
  );
}

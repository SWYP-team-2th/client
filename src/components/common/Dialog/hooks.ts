import { useContext } from 'react';
import { DialogContext } from './DialogProvider';

export const useDialog = () => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('useDialog는 DialogProvider 내부에서 사용해야 합니다.');
  }

  return {
    openDialog: (dialog: React.ReactNode) => context.openDialog(dialog),
    closeDialog: () => context.closeDialog(),
  };
};

import Dialog from './Dialog';
import { DialogProvider } from './DialogProvider';
import { useDialog } from './hooks';
import { Button } from '../Button/Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Dialog> = {
  title: 'common/Dialog',
  component: Dialog,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '투표 올리기',
    description: '투표 올리기 설명',
    cancelButtonProps: {
      text: '취소',
    },
    confirmButtonProps: {
      text: '확인',
      onClick: () => {},
    },
  },
  render: (args) => <Dialog {...args} />,
};

export const OnlyConfirmButton: Story = {
  args: {
    title: '투표 올리기',
    description: '투표 올리기 설명',
    confirmButtonProps: {
      text: '확인',
      onClick: () => {},
    },
    showLaterButton: true,
  },
  render: (args) => <Dialog {...args} />,
};

export const Example: Story = {
  render: () => <StorybookDialog />,
};

const DialogOpenButton = () => {
  const { open } = useDialog();
  return (
    <Button
      buttonType="primary"
      size="large"
      variant="solid"
      onClick={() => open(<StorybookDialogComponent />)}
    >
      대화창 열기
    </Button>
  );
};

const StorybookDialogComponent = () => {
  return (
    <Dialog
      title="투표 올리기"
      description="투표 올리기 설명"
      cancelButtonProps={{ text: '취소' }}
      confirmButtonProps={{ text: '확인', onClick: () => {} }}
      showLaterButton={true}
    />
  );
};

const StorybookDialog = () => {
  return (
    <DialogProvider>
      <DialogOpenButton />
    </DialogProvider>
  );
};

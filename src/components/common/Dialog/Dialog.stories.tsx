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
  render: (args) => (
    <DialogProvider>
      <Dialog {...args} />
    </DialogProvider>
  ),
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
  render: (args) => (
    <DialogProvider>
      <Dialog {...args} />
    </DialogProvider>
  ),
};

export const CustomDialog: Story = {
  args: {
    title: (
      <p>
        당신의 선택은?
        <br />
        로그인하고 투표에 참여하세요!
      </p>
    ),
    description: '카카오로 로그인 하고, 뽀또픽의 모든 기능을 이용해 보세요!',
    hasCloseButton: true,
    customButtonProps: (
      <div className="flex flex-col gap-2 w-full">
        <Button buttonType="primary" size="large" variant="solid">
          카카오로 시작하기
        </Button>
        <Button buttonType="primary" size="large" variant="outline">
          게스트로 시작하기
        </Button>
      </div>
    ),
    inlineMessage:
      '게스트로 계정은 위치가 바뀌거나, 일정기간이 지나면 사라져요!',
  },
  render: (args) => (
    <DialogProvider>
      <Dialog {...args} />
    </DialogProvider>
  ),
};

export const Example: Story = {
  render: () => <StorybookDialog />,
};

const DialogOpenButton = () => {
  const { openDialog } = useDialog();
  return (
    <Button
      buttonType="primary"
      size="large"
      variant="solid"
      onClick={() => openDialog(<StorybookDialogComponent />)}
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

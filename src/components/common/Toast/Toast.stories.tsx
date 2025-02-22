import useToast from './hooks';
import Toast from './Toast';
import ToastProvider from './ToastProvider';
import { Button } from '../Button/Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Toast> = {
  title: 'common/Toast',
  component: Toast,
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    type: 'success',
    title: '토스트 메시지',
    description: '토스트 메시지 설명',
  },
  render: (args) => <Toast {...args} />,
};

export const Example: Story = {
  render: () => <StorybookToast />,
};

const StorybookToast = () => {
  return (
    <ToastProvider>
      <ToastButton />
    </ToastProvider>
  );
};

const ToastButton = () => {
  const toast = useToast();

  return (
    <Button
      buttonType="primary"
      borderSize="medium"
      variant="solid"
      onClick={() =>
        toast.success({
          title: '투표 올리기에 성공하였습니다.',
          description: '투표 용지를 지인들에게 공유해보세요!',
        })
      }
    >
      토스트 열기
    </Button>
  );
};

import Dialog from './Dialog';
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
      onClick: () => {},
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

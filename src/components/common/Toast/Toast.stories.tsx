import Toast from './Toast';
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

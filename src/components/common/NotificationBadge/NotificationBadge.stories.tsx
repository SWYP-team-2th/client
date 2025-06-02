import NotificationBadge from './NotificationBadge';
import { NotificationBadgeProps } from './types';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof NotificationBadge> = {
  title: 'common/NotificationBadge',
  component: NotificationBadge,
};

export default meta;

type Story = StoryObj<NotificationBadgeProps>;

export const New: Story = {
  args: {
    type: 'new',
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['new', 'count'],
    },
  },
  render: (args: NotificationBadgeProps) => <NotificationBadge {...args} />,
};

export const Count: Story = {
  args: {
    type: 'count',
    count: 10,
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['new', 'count'],
    },
  },
  render: (args: NotificationBadgeProps) => <NotificationBadge {...args} />,
};

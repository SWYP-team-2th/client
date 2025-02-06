import Icon, { ICONS } from './Icon';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Icon> = {
  title: 'common/Icon',
  component: Icon,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'BookmarkFill',
  },
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(ICONS),
    },
  },
  render: (args) => <Icon {...args} />,
};

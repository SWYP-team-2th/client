import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'common/Label',
  component: Label,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['solid', 'outline'],
    },
    colorVarient: {
      control: { type: 'radio' },
      options: ['neutral', 'progress', 'ended'],
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium'],
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Example: Story = {
  args: {
    variant: 'solid',
    colorVarient: 'neutral',
    size: 'medium',
    children: 'Label',
  },
};

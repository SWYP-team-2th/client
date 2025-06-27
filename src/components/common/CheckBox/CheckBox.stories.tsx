import { useState } from 'react';
import CheckBox from './CheckBox';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CheckBox> = {
  title: 'Common/CheckBox',
  component: CheckBox,
  argTypes: {
    size: {
      options: ['large', 'small'],
    },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof CheckBox>;

export const Default: Story = {
  args: {
    checked: false,
    size: 'large',
    disabled: false,
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return (
      <CheckBox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

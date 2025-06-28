import { useState } from 'react';
import CheckBox from './CheckBoxWithLabel';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CheckBox> = {
  title: 'Common/CheckBox',
  component: CheckBox,
  argTypes: {
    size: {
      options: ['large', 'small'],
    },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    label: { control: 'text' },
    id: { control: 'number' },
  },
};
export default meta;

type Story = StoryObj<typeof CheckBox>;

export const WithLabel: Story = {
  args: {
    id: '1',
    checked: false,
    size: 'large',
    disabled: false,
    readOnly: false,
    label: '체크박스',
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

export const ReadOnly: Story = {
  args: {
    id: '2',
    checked: true,
    size: 'large',
    disabled: false,
    readOnly: true,
    label: '체크박스',
  },
  render: (args) => {
    return <CheckBox {...args} onChange={() => {}} />;
  },
};

export const Disabled: Story = {
  args: {
    id: '3',
    checked: false,
    size: 'large',
    disabled: true,
    readOnly: false,
    label: '체크박스',
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

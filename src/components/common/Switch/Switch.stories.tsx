import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Switch from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'common/Switch',
  component: Switch,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <MediumSwitch />,
};

export const Small: Story = {
  render: () => <SmallSwitch />,
};

const MediumSwitch = () => {
  const [checked, setChecked] = useState(false);

  return <Switch size="medium" checked={checked} onChange={setChecked} />;
};
const SmallSwitch = () => {
  const [checked, setChecked] = useState(false);

  return <Switch size="small" checked={checked} onChange={setChecked} />;
};

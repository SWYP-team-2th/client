import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import RadioButton from './RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'common/RadioButton',
  component: RadioButton,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <MediumRadioButtonWithText />,
};

const MediumRadioButtonWithText = () => {
  const [value, setValue] = useState('radio-button-1');

  const OPTIONS = [
    { label: 'Radio Button 1', value: 'radio-button-1' },
    { label: 'Radio Button 2', value: 'radio-button-2' },
    { label: 'Radio Button 3', value: 'radio-button-3' },
  ];

  return (
    <div>
      {OPTIONS.map((option) => (
        <RadioButton
          key={option.value}
          value={option.value}
          checked={value === option.value}
          onChange={setValue}
          label={option.label}
        />
      ))}
    </div>
  );
};

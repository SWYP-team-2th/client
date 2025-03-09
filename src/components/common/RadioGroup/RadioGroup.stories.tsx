import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import RadioGroup from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'common/RadioGroup',
  component: RadioGroup,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <StorybookRadioGroup />,
};

const StorybookRadioGroup = () => {
  const [selectedOption, setSelectedOption] = useState('option1');

  return (
    <RadioGroup
      options={[
        { value: 'option1', label: '옵션 1' },
        { value: 'option2', label: '옵션 2' },
        { value: 'option3', label: '옵션 3' },
      ]}
      direction="horizontal"
      value={selectedOption}
      onChange={setSelectedOption}
      name="myOptions"
    />
  );
};

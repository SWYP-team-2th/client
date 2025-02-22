import Icon from '../Icon';
import TextField from './TextField';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextField> = {
  title: 'common/TextField',
  component: TextField,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default',
    placeholder: '내용 입력',
    maxLength: 200,
    showLengthIndicator: true,
    inlineMessage: '도움말 메시지',
    variant: 'outlined',
  },
  render: (args) => <TextField {...args} />,
};

export const RightNode: Story = {
  args: {
    label: 'Default',
    placeholder: '내용 입력',
    maxLength: 200,
    showLengthIndicator: true,
    inlineMessage: '도움말 메시지',
    variant: 'outlined',
    rightNode: <Icon name="Edit" size="medium" />,
  },
  render: (args) => <TextField {...args} />,
};

export const Success: Story = {
  args: {
    label: 'Success',
    placeholder: '내용 입력',
    maxLength: 200,
    status: 'success',
    showLengthIndicator: true,
    inlineMessage: '도움말 메시지',
    variant: 'outlined',
  },
  render: (args) => <TextField {...args} />,
};

export const Error: Story = {
  args: {
    label: 'Error',
    placeholder: '내용 입력',
    maxLength: 200,
    status: 'error',
    showLengthIndicator: true,
    inlineMessage: '도움말 메시지',
    variant: 'outlined',
  },
  render: (args) => <TextField {...args} />,
};

export const Solid: Story = {
  args: {
    label: 'Solid',
    placeholder: '내용 입력',
    maxLength: 200,
    status: 'default',
    showLengthIndicator: true,
    inlineMessage: '도움말 메시지',
    variant: 'solid',
  },
  render: (args) => <TextField {...args} />,
};

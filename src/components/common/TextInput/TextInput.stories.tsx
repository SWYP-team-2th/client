import Icon from '../Icon';
import TextInput from './TextInput';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextInput> = {
  title: 'common/TextInput',
  component: TextInput,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default',
    placeholder: '내용 입력',
    maxLength: 50,
    showLengthIndicator: true,
    inlineMessage: '도움말 메시지',
    variant: 'outlined',
  },
  render: (args) => <TextInput {...args} />,
};

export const RightNode: Story = {
  args: {
    label: 'Default',
    placeholder: '내용 입력',
    maxLength: 50,
    showLengthIndicator: true,
    inlineMessage: '도움말 메시지',
    variant: 'outlined',
    rightNode: <Icon name="Edit" />,
  },
  render: (args) => <TextInput {...args} />,
};

export const Success: Story = {
  args: {
    label: 'Success',
    placeholder: '내용 입력',
    maxLength: 50,
    status: 'success',
    showLengthIndicator: true,
    inlineMessage: '도움말 메시지',
    variant: 'outlined',
  },
  render: (args) => <TextInput {...args} />,
};

export const Error: Story = {
  args: {
    label: 'Error',
    placeholder: '내용 입력',
    maxLength: 50,
    status: 'error',
    showLengthIndicator: true,
    inlineMessage: '도움말 메시지',
    variant: 'outlined',
  },
  render: (args) => <TextInput {...args} />,
};

export const Solid: Story = {
  args: {
    label: 'Solid',
    placeholder: '내용 입력',
    maxLength: 50,
    showLengthIndicator: true,
    inlineMessage: '도움말 메시지',
    variant: 'solid',
  },
  render: (args) => <TextInput {...args} />,
};

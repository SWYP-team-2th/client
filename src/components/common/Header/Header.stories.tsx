import { Header } from './Header';
import type { Meta, StoryObj } from '@storybook/react';
import Logo from '@/assets/icons/logo.svg?react';
import Icon from '@/components/common/Icon';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

const Text = () => <span className="font-bold text-base">텍스트</span>;

export const LogoWithBothIcons: Story = {
  name: 'Logo + 양쪽 아이콘',
  args: {
    leftNode: <Icon name="ArrowLeft" size="large" />,
    centerNode: <Logo style={{ width: 80, cursor: 'pointer' }} />,
    rightNode: <Icon name="More" size="large" />,
  },
};

export const TextWithBothIcons: Story = {
  name: 'Text + 양쪽 아이콘',
  args: {
    leftNode: <Icon name="ArrowLeft" size="large" />,
    centerNode: <Text />,
    rightNode: <Icon name="More" size="large" />,
  },
};

export const LogoWithRightIcon: Story = {
  name: 'Logo + 오른쪽 아이콘',
  args: {
    leftNode: <Logo style={{ width: 80, cursor: 'pointer' }} />,
    rightNode: <Icon name="More" size="large" />,
  },
};

export const TextWithRightIcon: Story = {
  name: 'Text + 오른쪽 아이콘',
  args: {
    centerNode: <Text />,
    rightNode: <Icon name="More" size="large" />,
  },
};

export const LogoWithLeftIcon: Story = {
  name: 'Logo + 왼쪽 아이콘',
  args: {
    leftNode: <Icon name="ArrowLeft" size="large" />,
    centerNode: <Logo style={{ width: 80, cursor: 'pointer' }} />,
  },
};

export const TextWithLeftIcon: Story = {
  name: 'Text + 왼쪽 아이콘',
  args: {
    leftNode: <Icon name="ArrowLeft" size="large" />,
    centerNode: <Text />,
  },
};

import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'common/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const SolidPrimaryLarge: Story = {
  args: {
    variant: 'solid',
    buttonType: 'primary',
    size: 'large',
    children: 'Large Button',
  },
};

export const SolidSecondaryMedium: Story = {
  args: {
    variant: 'solid',
    buttonType: 'secondary',
    size: 'medium',
    children: 'Medium Button',
  },
};

export const SolidDisabledSmall: Story = {
  args: {
    variant: 'solid',
    buttonType: 'disabled',
    size: 'small',
    children: 'Small Button',
  },
};

export const OutlinePrimaryMedium: Story = {
  args: {
    variant: 'outline',
    buttonType: 'secondary',
    size: 'large',
    children: 'Large Button',
  },
};

export const OutlineSecondaryLarge: Story = {
  args: {
    variant: 'outline',
    buttonType: 'primary',
    size: 'medium',
    children: 'Medium Button',
  },
};

export const OutlineDisabledSmall: Story = {
  args: {
    variant: 'outline',
    buttonType: 'disabled',
    size: 'small',
    children: 'Small Button',
  },
};

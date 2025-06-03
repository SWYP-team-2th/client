import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';
import type { Meta, StoryObj } from '@storybook/react';

const queryClient = new QueryClient();

const meta: Meta<typeof Navigation> = {
  title: 'Components/Navigation',
  component: Navigation,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
          <div>
            <Story />
          </div>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  name: '바텀 네비게이션',
};

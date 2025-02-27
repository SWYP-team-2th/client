import { Meta, StoryObj } from '@storybook/react';
import BottomSheet from './BottomSheet';
import { BottomSheetProvider } from './BottomSheetProvider';
import { useBottomSheet } from './hooks';
import { Button } from '../Button/Button';

const meta: Meta<typeof BottomSheet> = {
  title: 'common/BottomSheet',
  component: BottomSheet,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '링크 공유하기',
    hasCloseButton: true,
    children: <div>hi</div>,
  },
  render: (args) => <BottomSheet {...args} />,
};

export const Example: Story = {
  render: () => <StorybookBottomSheet />,
};

const BottomSheetOpenButton = () => {
  const { openBottomSheet } = useBottomSheet();

  return (
    <Button
      buttonType="primary"
      size="large"
      variant="solid"
      onClick={() => openBottomSheet(<StorybookBottomSheetComponent />)}
    >
      대화창 열기
    </Button>
  );
};

const StorybookBottomSheetComponent = () => {
  return (
    <BottomSheet title="링크 공유하기" hasCloseButton>
      <div>hi</div>
    </BottomSheet>
  );
};

const StorybookBottomSheet = () => {
  return (
    <BottomSheetProvider>
      <BottomSheetOpenButton />
    </BottomSheetProvider>
  );
};

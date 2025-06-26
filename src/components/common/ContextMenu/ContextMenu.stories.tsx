import { Meta, StoryObj } from '@storybook/react';
import ContextMenu from '@/components/common/ContextMenu/ContextMenu';
import Icon from '@/components/common/Icon';

const meta: Meta<typeof ContextMenu> = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const CustomMenu: Story = {
  render: () => (
    <div className="flex justify-center items-center h-screen">
      <ContextMenu>
        <ContextMenu.Trigger>
          <Icon name="More" size="medium" />
        </ContextMenu.Trigger>
        <ContextMenu.List>
          <ContextMenu.Item
            icon={<Icon name="Post" size="medium" />}
            onClick={() => alert('수정!')}
          >
            수정하기
          </ContextMenu.Item>
          <ContextMenu.Item
            icon={<Icon name="Trash" size="medium" />}
            className="text-body-2"
            onClick={() => alert('삭제!')}
          >
            삭제하기
          </ContextMenu.Item>
        </ContextMenu.List>
      </ContextMenu>
    </div>
  ),
};

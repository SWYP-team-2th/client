import ButtonExample from './Component.template';
import type { Meta, StoryObj } from '@storybook/react';

// storybook meta data 설정
// title: storybook 사이드바에서 보여질 경로와 이름
// component: 스토리북을 작성할 컴포넌트
const meta: Meta<typeof ButtonExample> = {
  title: 'templates/ButtonExample',
  component: ButtonExample,
};

export default meta;

// Story 타입 정의
// meta 타입을 추론하여 Story 타입을 정의합니다.
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  // args: 컴포넌트에 전달할 props를 정의합니다.
  args: {
    text: 'Primary',
    variant: 'primary',
  },
  // render: 컴포넌트를 렌더링하는 방식을 정의합니다.
  // - args를 스프레드 연산자로 전달하여 모든 props를 전달
  render: (args) => <ButtonExample {...args} />,
};

export const Secondary: Story = {
  args: {
    text: 'Secondary',
    variant: 'secondary',
  },
  render: (args) => <ButtonExample {...args} />,
};

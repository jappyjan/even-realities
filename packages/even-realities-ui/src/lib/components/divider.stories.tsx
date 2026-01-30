import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Divider } from './divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[320px]">
      <div className="text-app-body-2 text-tc-2">Section one</div>
      <Divider className="my-12" />
      <div className="text-app-body-2 text-tc-2">Section two</div>
    </div>
  ),
};

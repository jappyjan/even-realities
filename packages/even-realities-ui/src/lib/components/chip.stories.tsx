import type { Meta, StoryObj } from '@storybook/react';

import { Chip } from './chip';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  args: {
    children: 'Chip',
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12">
      <Chip size="sm">Small</Chip>
      <Chip size="lg">Large</Chip>
    </div>
  ),
};

export const Removable: Story = {
  render: () => <Chip onRemove={() => undefined}>Removable</Chip>,
};

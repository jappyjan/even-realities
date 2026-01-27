import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './text';

const meta = {
  title: 'Components/Text',
  component: Text,
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className="grid gap-12">
      <Text variant="title-xl">Title XL</Text>
      <Text variant="title-lg">Title LG</Text>
      <Text variant="title-1">Title 1</Text>
      <Text variant="body-1">Body 1</Text>
      <Text variant="title-2">Title 2</Text>
      <Text variant="body-2">Body 2</Text>
      <Text variant="subtitle">Subtitle</Text>
      <Text variant="detail">Detail</Text>
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Select } from './select';

const meta = {
  title: 'Components/Select',
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select>
      <option value="">Choose an option</option>
      <option value="one">Option one</option>
      <option value="two">Option two</option>
      <option value="three">Option three</option>
    </Select>
  ),
};

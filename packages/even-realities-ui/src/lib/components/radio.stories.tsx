import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Radio } from './radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  args: {
    label: 'Radio label',
    name: 'radio-example',
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    defaultChecked: true,
  },
};

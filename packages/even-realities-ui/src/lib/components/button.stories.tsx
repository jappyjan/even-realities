import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12">
      <Button variant="default">Default</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="negative">Negative</Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="grid gap-12">
      <div className="grid grid-cols-[120px_1fr_1fr_1fr] items-center gap-12 text-app-detail text-tc-2">
        <span />
        <span>Default</span>
        <span>Pressed</span>
        <span>Disabled</span>
      </div>
      <div className="grid grid-cols-[120px_1fr_1fr_1fr] items-center gap-12">
        <span className="text-app-detail text-tc-2">Default</span>
        <Button variant="default">Button</Button>
        <Button variant="default" className="bg-bc-3">
          Button
        </Button>
        <Button variant="default" disabled>
          Button
        </Button>
      </div>
      <div className="grid grid-cols-[120px_1fr_1fr_1fr] items-center gap-12">
        <span className="text-app-detail text-tc-2">Accent</span>
        <Button variant="accent">Button</Button>
        <Button variant="accent" className="bg-bc-accent-pressed">
          Button
        </Button>
        <Button variant="accent" disabled>
          Button
        </Button>
      </div>
      <div className="grid grid-cols-[120px_1fr_1fr_1fr] items-center gap-12">
        <span className="text-app-detail text-tc-2">Primary</span>
        <Button variant="primary">Button</Button>
        <Button variant="primary">Button</Button>
        <Button variant="primary" disabled>
          Button
        </Button>
      </div>
      <div className="grid grid-cols-[120px_1fr_1fr_1fr] items-center gap-12">
        <span className="text-app-detail text-tc-2">Negative</span>
        <Button variant="negative">Button</Button>
        <Button variant="negative" className="bg-bc-3 text-tc-red">
          Button
        </Button>
        <Button variant="negative" disabled>
          Button
        </Button>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-12">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

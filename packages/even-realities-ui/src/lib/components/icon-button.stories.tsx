import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { ChevronSmallDrillUpIcon } from './icons';
import { IconButton } from './icon-button';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    children: <ChevronSmallDrillUpIcon aria-hidden size={16} />,
    'aria-label': 'Icon button',
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12">
      <IconButton variant="default">
        <ChevronSmallDrillUpIcon aria-hidden size={16} />
      </IconButton>
      <IconButton variant="accent">
        <ChevronSmallDrillUpIcon aria-hidden size={16} />
      </IconButton>
      <IconButton variant="primary">
        <ChevronSmallDrillUpIcon aria-hidden size={16} />
      </IconButton>
      <IconButton variant="negative">
        <ChevronSmallDrillUpIcon aria-hidden size={16} />
      </IconButton>
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
        <IconButton variant="default">
          <ChevronSmallDrillUpIcon aria-hidden size={16} />
        </IconButton>
        <IconButton variant="default" className="bg-bc-3">
          <ChevronSmallDrillUpIcon aria-hidden size={16} />
        </IconButton>
        <IconButton variant="default" disabled>
          <ChevronSmallDrillUpIcon aria-hidden size={16} />
        </IconButton>
      </div>
      <div className="grid grid-cols-[120px_1fr_1fr_1fr] items-center gap-12">
        <span className="text-app-detail text-tc-2">Accent</span>
        <IconButton variant="accent">
          <ChevronSmallDrillUpIcon aria-hidden size={16} />
        </IconButton>
        <IconButton variant="accent" className="bg-bc-accent-pressed">
          <ChevronSmallDrillUpIcon aria-hidden size={16} />
        </IconButton>
        <IconButton variant="accent" disabled>
          <ChevronSmallDrillUpIcon aria-hidden size={16} />
        </IconButton>
      </div>
      <div className="grid grid-cols-[120px_1fr_1fr_1fr] items-center gap-12">
        <span className="text-app-detail text-tc-2">Primary</span>
        <IconButton variant="primary">
          <ChevronSmallDrillUpIcon aria-hidden size={16} />
        </IconButton>
        <IconButton variant="primary">
          <ChevronSmallDrillUpIcon aria-hidden size={16} />
        </IconButton>
        <IconButton variant="primary" disabled>
          <ChevronSmallDrillUpIcon aria-hidden size={16} />
        </IconButton>
      </div>
      <div className="grid grid-cols-[120px_1fr_1fr_1fr] items-center gap-12">
        <span className="text-app-detail text-tc-2">Negative</span>
        <IconButton variant="negative">
          <ChevronSmallDrillUpIcon aria-hidden size={16} />
        </IconButton>
        <IconButton variant="negative" className="bg-bc-3 text-tc-red">
          <ChevronSmallDrillUpIcon aria-hidden size={16} />
        </IconButton>
        <IconButton variant="negative" disabled>
          <ChevronSmallDrillUpIcon aria-hidden size={16} />
        </IconButton>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-12">
      <IconButton size="sm">
        <ChevronSmallDrillUpIcon aria-hidden size={12} />
      </IconButton>
      <IconButton size="md">
        <ChevronSmallDrillUpIcon aria-hidden size={16} />
      </IconButton>
      <IconButton size="lg">
        <ChevronSmallDrillUpIcon aria-hidden size={20} />
      </IconButton>
    </div>
  ),
};

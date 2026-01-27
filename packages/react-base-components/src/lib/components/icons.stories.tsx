import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import * as Icons from './icons';

const meta = {
  title: 'Components/Icons',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const iconEntries = Object.entries(Icons)
  .filter(
    ([name, value]) =>
      name.endsWith('Icon') &&
      (typeof value === 'function' ||
        (typeof value === 'object' && value !== null && 'render' in value)),
  )
  .sort(([nameA], [nameB]) => nameA.localeCompare(nameB));

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        margin: '40px',
        maxWidth: '1200px',
        gap: '16px',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
    >
      {iconEntries.map(([name, IconComponent]) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            alignItems: 'center',
            fontSize: '12px',
            width: '120px',
          }}
        >
          <IconComponent size={32} aria-hidden />
          <span
            style={{
              textAlign: 'center',
              wordBreak: 'break-word',
              overflowWrap: 'anywhere',
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};

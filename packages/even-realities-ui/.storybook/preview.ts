import type { Preview } from '@storybook/react';

import '../src/lib/styles.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    controls: { expanded: true },
    docs: {
      source: {
        type: 'dynamic',
        state: 'open',
      },
    },
    layout: 'centered',
  },
};

export default preview;

import type { Preview } from '@storybook/react';

import '../src/lib/styles.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    controls: { expanded: true },
    layout: 'centered',
  },
};

export default preview;

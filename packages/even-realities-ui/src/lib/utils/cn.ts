import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  classGroups: {
    'font-size': [
      {
        text: [
          'app-title-xl',
          'app-title-lg',
          'app-title-1',
          'app-body-1',
          'app-title-2',
          'app-body-2',
          'app-subtitle',
          'app-detail',
        ],
      },
    ],
    'text-color': [
      {
        'text-tc': [
          'highlight',
          'highlight-pressed',
          'red',
          'red-muted',
          'green',
          '1',
          '2',
          'accent',
        ],
      },
    ],
  },
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

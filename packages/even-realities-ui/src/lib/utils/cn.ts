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
        text: [
          'tc-highlight',
          'tc-highlight-pressed',
          'tc-red',
          'tc-red-muted',
          'tc-green',
          'tc-1',
          'tc-2',
          'tc-accent',
        ],
      },
    ],
  },
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

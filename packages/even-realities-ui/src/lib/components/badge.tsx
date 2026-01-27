import * as React from 'react';

import { cn } from '../utils/cn';

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export const Badge = ({ className, ...props }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center rounded-sm border border-bc-3 bg-bc-2 px-8 py-4 text-app-detail text-tc-1',
      className,
    )}
    {...props}
  />
);

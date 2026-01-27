import * as React from 'react';

import { cn } from '../utils/cn';

type ChipSize = 'sm' | 'lg';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: ChipSize;
  onRemove?: () => void;
}

const sizeClasses: Record<ChipSize, string> = {
  sm: 'px-12 py-4 text-app-detail',
  lg: 'px-16 py-8 text-app-body-2',
};

export const Chip = ({ className, size = 'lg', onRemove, children, ...props }: ChipProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-8 rounded-sm border border-bc-3 bg-bc-2 text-tc-1',
      sizeClasses[size],
      className,
    )}
    {...props}
  >
    <span>{children}</span>
    {onRemove && (
      <button
        type="button"
        onClick={onRemove}
        className="text-app-detail text-tc-2 hover:text-tc-1"
        aria-label="Remove"
      >
        x
      </button>
    )}
  </span>
);

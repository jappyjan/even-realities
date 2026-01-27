import * as React from 'react';

import { cn } from '../utils/cn';

type IconButtonVariant = 'default' | 'accent' | 'primary' | 'negative';
type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
}

const baseClasses =
  'inline-flex items-center justify-center rounded-sm border border-transparent transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bc-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-bc-1 disabled:pointer-events-none';

const variantClasses: Record<IconButtonVariant, string> = {
  default:
    'bg-bc-1 text-tc-1 active:bg-bc-3 disabled:bg-bc-1 disabled:text-tc-2',
  accent:
    'bg-bc-accent text-tc-1 active:bg-bc-accent-pressed disabled:bg-bc-accent-muted disabled:text-tc-2',
  primary:
    'bg-bc-highlight text-tc-highlight active:bg-bc-highlight active:text-tc-highlight-pressed disabled:bg-bc-3 disabled:text-tc-highlight',
  negative:
    'bg-bc-1 text-tc-red active:bg-bc-3 active:text-tc-red disabled:bg-bc-1 disabled:text-tc-red',
};

const sizeClasses: Record<IconButtonSize, string> = {
  sm: 'h-28 w-28',
  md: 'h-32 w-32',
  lg: 'h-40 w-40',
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { className, variant = 'default', size = 'md', type = 'button', ...props },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      {...props}
    />
  ),
);

IconButton.displayName = 'IconButton';

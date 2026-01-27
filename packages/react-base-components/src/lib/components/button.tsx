import * as React from 'react';

import { cn } from '../utils/cn';

type ButtonVariant = 'default' | 'accent' | 'primary' | 'negative';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseClasses =
  'inline-flex items-center justify-center gap-8 rounded-sm border border-transparent text-app-body-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bc-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-bc-1 disabled:pointer-events-none';

const variantClasses: Record<ButtonVariant, string> = {
  default:
    'bg-bc-1 text-tc-1 active:bg-bc-3 disabled:bg-bc-1 disabled:text-tc-2',
  accent:
    'bg-bc-accent text-tc-1 active:bg-bc-accent-pressed disabled:bg-bc-accent-muted disabled:text-tc-2',
  primary:
    'bg-bc-highlight text-tc-highlight active:bg-bc-highlight active:text-tc-highlight-pressed disabled:bg-bc-3 disabled:text-tc-highlight',
  negative:
    'bg-bc-1 text-tc-red active:bg-bc-3 active:text-tc-red disabled:bg-bc-1 disabled:text-tc-red',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-28 px-12 text-app-body-2',
  md: 'h-32 px-16 text-app-body-1',
  lg: 'h-40 px-20 text-app-title-2',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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

Button.displayName = 'Button';

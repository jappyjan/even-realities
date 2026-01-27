import * as React from 'react';

import { cn } from '../utils/cn';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const inputClasses =
  'flex h-32 w-full rounded-sm border border-bc-4 bg-bc-1 px-12 text-app-body-2 text-tc-1 placeholder:text-tc-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bc-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-bc-1 disabled:cursor-not-allowed disabled:opacity-50';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(inputClasses, className)}
      {...props}
    />
  ),
);

Input.displayName = 'Input';

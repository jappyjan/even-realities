import * as React from 'react';

import { cn } from '../utils/cn';

export interface SwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, disabled, ...props }, ref) => (
    <label
      className={cn(
        'inline-flex items-center gap-12 text-app-body-2 text-tc-1',
        disabled && 'cursor-not-allowed opacity-50',
      )}
    >
      <span className="relative inline-flex items-center">
        <input
          ref={ref}
          type="checkbox"
          disabled={disabled}
          className={cn('peer sr-only', className)}
          {...props}
        />
        <span className="h-20 w-32 rounded-full border border-bc-4 bg-bc-3 transition peer-checked:bg-bc-highlight" />
        <span className="absolute left-2 top-2 h-16 w-16 rounded-full bg-bc-1 transition peer-checked:translate-x-12" />
      </span>
      {label && <span>{label}</span>}
    </label>
  ),
);

Switch.displayName = 'Switch';

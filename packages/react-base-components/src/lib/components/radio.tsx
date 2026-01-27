import * as React from 'react';

import { cn } from '../utils/cn';

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

const radioClasses =
  'mt-2 h-16 w-16 rounded-full border border-bc-4 bg-bc-1 text-tc-1 accent-bc-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bc-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-bc-1';

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, disabled, ...props }, ref) => (
    <label
      className={cn(
        'inline-flex items-start gap-12 text-app-body-2 text-tc-1',
        disabled && 'cursor-not-allowed opacity-50',
      )}
    >
      <input
        ref={ref}
        type="radio"
        disabled={disabled}
        className={cn(radioClasses, className)}
        {...props}
      />
      {(label || description) && (
        <span className="grid gap-4">
          {label && <span>{label}</span>}
          {description && (
            <span className="text-app-detail text-tc-2">{description}</span>
          )}
        </span>
      )}
    </label>
  ),
);

Radio.displayName = 'Radio';

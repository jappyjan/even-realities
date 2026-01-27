import * as React from 'react';

import { cn } from '../utils/cn';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const selectClasses =
  'flex h-32 w-full appearance-none rounded-sm border border-bc-4 bg-bc-1 px-12 text-app-body-2 text-tc-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bc-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-bc-1 disabled:cursor-not-allowed disabled:opacity-50';

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => (
    <select ref={ref} className={cn(selectClasses, className)} {...props} />
  ),
);

Select.displayName = 'Select';

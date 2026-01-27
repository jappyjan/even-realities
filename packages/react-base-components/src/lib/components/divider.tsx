import * as React from 'react';

import { cn } from '../utils/cn';

export interface DividerProps
  extends React.HTMLAttributes<HTMLHRElement> {}

export const Divider = ({ className, ...props }: DividerProps) => (
  <hr className={cn('w-full border-bc-3', className)} {...props} />
);

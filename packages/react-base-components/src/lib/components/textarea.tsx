import * as React from 'react';

import { cn } from '../utils/cn';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const textareaClasses =
  'flex min-h-32 w-full resize-y rounded-sm border border-bc-4 bg-bc-1 px-12 py-8 text-app-body-2 text-tc-1 placeholder:text-tc-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bc-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-bc-1 disabled:cursor-not-allowed disabled:opacity-50';

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(textareaClasses, className)} {...props} />
  ),
);

Textarea.displayName = 'Textarea';

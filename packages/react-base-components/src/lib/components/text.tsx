import * as React from 'react';

import { cn } from '../utils/cn';

type TextVariant =
  | 'title-xl'
  | 'title-lg'
  | 'title-1'
  | 'body-1'
  | 'title-2'
  | 'body-2'
  | 'subtitle'
  | 'detail';

const variantClasses: Record<TextVariant, string> = {
  'title-xl': 'text-app-title-xl',
  'title-lg': 'text-app-title-lg',
  'title-1': 'text-app-title-1',
  'body-1': 'text-app-body-1',
  'title-2': 'text-app-title-2',
  'body-2': 'text-app-body-2',
  subtitle: 'text-app-subtitle',
  detail: 'text-app-detail',
};

export type TextProps<T extends React.ElementType = 'span'> = {
  as?: T;
  variant?: TextVariant;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as'>;

export const Text = <T extends React.ElementType = 'span'>({
  as,
  variant = 'body-1',
  className,
  ...props
}: TextProps<T>) => {
  const Component = as ?? 'span';

  return (
    <Component
      className={cn(variantClasses[variant], 'text-tc-1', className)}
      {...props}
    />
  );
};

Text.displayName = 'Text';

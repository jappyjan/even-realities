import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface PauseIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const PauseIcon = React.forwardRef<SVGSVGElement, PauseIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="729 318.925 32 32" title={title} {...props}>
      <path d="M740 346.925H738V322.925H740V346.925ZM752 346.925H750V322.925H752V346.925Z"/>
    </IconBase>
  ),
);

PauseIcon.displayName = 'PauseIcon';

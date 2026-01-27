import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type TimeCountingIconProps = Omit<IconBaseProps, 'viewBox'>;
export const TimeCountingIcon = React.forwardRef<SVGSVGElement, TimeCountingIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="330 212.925 32 32" title={title} {...props}>
      <path d="M357 241.925H335V239.925H357V241.925ZM335 239.925H333V217.925H335V239.925ZM359 239.925H357V217.925H359V239.925ZM347.989 228.929H345.991V230.926H339.995V228.926H345.989V220.93H347.989V228.929ZM357 217.925H335V215.925H357V217.925Z"/>
    </IconBase>
  ),
);

TimeCountingIcon.displayName = 'TimeCountingIcon';

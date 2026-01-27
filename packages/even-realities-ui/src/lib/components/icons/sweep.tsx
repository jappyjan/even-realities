import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type SweepIconProps = Omit<IconBaseProps, 'viewBox'>;
export const SweepIcon = React.forwardRef<SVGSVGElement, SweepIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="465 212.925 32 32" title={title} {...props}>
      <path d="M477 239.925H480V230.925H482V239.925H485V241.925H472V239.925H475V230.925H477V239.925ZM490 241.925H487V239.925H490V241.925ZM469 225.925H493V223.925H495V227.925H492V239.925H490V227.925H472V239.925H470V227.925H467V223.925H469V225.925ZM487 239.925H485V230.925H487V239.925ZM487 221.925H493V223.925H485V217.925H477V223.925H469V221.925H475V215.925H487V221.925Z"/>
    </IconBase>
  ),
);

SweepIcon.displayName = 'SweepIcon';

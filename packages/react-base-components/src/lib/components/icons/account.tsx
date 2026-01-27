import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface AccountIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const AccountIcon = React.forwardRef<SVGSVGElement, AccountIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="462 530.925 32 32" title={title} {...props}>
      <path d="M469 559.925H467V551.925H469V559.925ZM489 559.925H487V551.925H489V559.925ZM471 551.925H469V549.925H471V551.925ZM487 551.925H485V549.925H487V551.925ZM485 549.925H471V547.925H485V549.925ZM482 545.925H474V543.925H482V545.925ZM474 543.925H472V535.925H474V543.925ZM484 543.925H482V535.925H484V543.925ZM482 535.925H474V533.925H482V535.925Z"/>
    </IconBase>
  ),
);

AccountIcon.displayName = 'AccountIcon';

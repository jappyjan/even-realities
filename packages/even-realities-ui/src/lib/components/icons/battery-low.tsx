import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface BatteryLowIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const BatteryLowIcon = React.forwardRef<SVGSVGElement, BatteryLowIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="202 319.648 32 32" title={title} {...props}>
      <path d="M228 343.648H205V341.648H228V343.648ZM205 341.648H203V329.648H205V341.648ZM230 332.648H232V338.648H230V341.648H228V329.648H230V332.648ZM210 339.648H208V331.648H210V339.648ZM228 329.648H205V327.648H228V329.648Z"/>
    </IconBase>
  ),
);

BatteryLowIcon.displayName = 'BatteryLowIcon';

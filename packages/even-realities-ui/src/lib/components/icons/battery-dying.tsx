import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface BatteryDyingIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const BatteryDyingIcon = React.forwardRef<SVGSVGElement, BatteryDyingIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="334 319.648 32 32" title={title} {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M337 341.648L360 341.648L360 343.648L337 343.648L337 341.648Z"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M337 327.648L360 327.648L360 329.648L337 329.648L337 327.648Z"/>
      <rect x="360" y="329.648" width="2" height="12"/>
      <rect x="362" y="332.648" width="2" height="6"/>
      <rect x="335" y="329.648" width="2" height="12"/>
      <rect x="340" y="331.648" width="2" height="8"/>
    </IconBase>
  ),
);

BatteryDyingIcon.displayName = 'BatteryDyingIcon';

import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface BatteryFullIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const BatteryFullIcon = React.forwardRef<SVGSVGElement, BatteryFullIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="862 213.648 32 32" title={title} {...props}>
      <path d="M888 237.648H865V235.648H888V237.648ZM865 235.648H863V223.648H865V235.648ZM890 226.648H892V232.648H890V235.648H888V223.648H890V226.648ZM870 233.648H868V225.648H870V233.648ZM875 233.648H873V225.648H875V233.648ZM880 233.648H878V225.648H880V233.648ZM885 233.648H883V225.648H885V233.648ZM888 223.648H865V221.648H888V223.648Z"/>
    </IconBase>
  ),
);

BatteryFullIcon.displayName = 'BatteryFullIcon';

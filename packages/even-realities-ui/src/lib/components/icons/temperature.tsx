import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type TemperatureIconProps = Omit<IconBaseProps, 'viewBox'>;
export const TemperatureIcon = React.forwardRef<SVGSVGElement, TemperatureIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="582.878 212.851 32 32" title={title} {...props}>

    </IconBase>
  ),
);

TemperatureIcon.displayName = 'TemperatureIcon';

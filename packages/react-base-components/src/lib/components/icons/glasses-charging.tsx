import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface GlassesChargingIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const GlassesChargingIcon = React.forwardRef<SVGSVGElement, GlassesChargingIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="466 107.648 32 32" title={title} {...props}>
      <path d="M484 125.648H494V130.648H484V125.648Z"/>
      <path d="M468 117.647H470V125.647H468V117.647Z"/>
      <path d="M484 123.648H494V125.648H484V123.648Z"/>
      <path d="M484 130.648H494V132.648H484V130.648Z"/>
      <path d="M481.999 117.647H483.999V121.647H481.999V117.647Z"/>
      <path d="M480.001 117.647H482.001V121.647H480.001V117.647Z"/>
      <path d="M480.001 119.65H484.001V121.65H480.001V119.65Z"/>
      <path d="M478.001 121.648H480.001V125.649H478.001V121.648Z"/>
      <path d="M494 117.648H496V121.648H494V117.648Z"/>
      <path d="M469.999 115.648H479.999V117.649H469.999V115.648Z"/>
      <path d="M484.002 115.648H494.002V117.649H484.002V115.648Z"/>
      <path d="M469.999 125.65H477.999V127.65H469.999V125.65Z"/>
      <path d="M494 125.648H496V130.648H494V125.648Z"/>
      <path d="M496 126.648H497V129.648H496V126.648Z"/>
      <rect x="482" y="125.648" width="2" height="5"/>
    </IconBase>
  ),
);

GlassesChargingIcon.displayName = 'GlassesChargingIcon';

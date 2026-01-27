import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface CopyIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const CopyIcon = React.forwardRef<SVGSVGElement, CopyIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="1125 106.925 32 32" title={title} {...props}>
      <rect x="1151" y="131.925" width="5" height="2" transform="rotate(-180 1151 131.925)"/>
      <rect x="1131" y="113.925" width="9" height="2"/>
      <rect x="1142" y="117.925" width="2" height="2"/>
      <rect x="1140" y="119.925" width="4" height="2" transform="rotate(-90 1140 119.925)"/>
      <rect x="1136" y="113.925" width="2" height="2" transform="rotate(-90 1136 113.925)"/>
      <rect x="1146" y="119.925" width="14" height="2" transform="rotate(90 1146 119.925)"/>
      <rect x="1130" y="133.925" width="14" height="2"/>
      <rect x="1138" y="109.925" width="13" height="2"/>
      <rect x="1129" y="115.925" width="2" height="18"/>
      <rect x="1151" y="111.925" width="2" height="18"/>
    </IconBase>
  ),
);

CopyIcon.displayName = 'CopyIcon';

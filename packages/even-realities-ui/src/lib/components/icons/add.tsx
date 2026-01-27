import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface AddIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const AddIcon = React.forwardRef<SVGSVGElement, AddIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="597 212.925 32 32" title={title} {...props}>
      <rect x="612" y="216.925" width="2" height="10"/>
      <rect x="602" y="228.925" width="2" height="10" transform="rotate(-90 602 228.925)"/>
      <rect x="614" y="238.925" width="2" height="10" transform="rotate(-180 614 238.925)"/>
      <rect x="624" y="226.925" width="2" height="10" transform="rotate(90 624 226.925)"/>
    </IconBase>
  ),
);

AddIcon.displayName = 'AddIcon';

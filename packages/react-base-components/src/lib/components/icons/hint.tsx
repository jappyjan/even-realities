import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface HintIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const HintIcon = React.forwardRef<SVGSVGElement, HintIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="1126 743.648 32 32" title={title} {...props}>
      <path d="M1139 754.648H1145V756.649H1139V754.648Z"/>
      <path d="M1139 762.648H1145V764.649H1139V762.648Z"/>
      <path d="M1145 756.648H1147V762.648H1145V756.648Z"/>
      <path d="M1137 756.648H1139V762.648H1137V756.648Z"/>
      <path d="M1139 756.648H1145V762.648H1139V756.648Z"/>
    </IconBase>
  ),
);

HintIcon.displayName = 'HintIcon';

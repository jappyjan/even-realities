import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface Battery75PercentIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const Battery75PercentIcon = React.forwardRef<SVGSVGElement, Battery75PercentIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="994 213.648 32 32" title={title} {...props}>
      <path d="M1020 237.648H997V235.648H1020V237.648ZM997 235.648H995V223.648H997V235.648ZM1022 226.648H1024V232.648H1022V235.648H1020V223.648H1022V226.648ZM1002 233.648H1000V225.648H1002V233.648ZM1007 233.648H1005V225.648H1007V233.648ZM1012 233.648H1010V225.648H1012V233.648ZM1020 223.648H997V221.648H1020V223.648Z"/>
    </IconBase>
  ),
);

Battery75PercentIcon.displayName = 'Battery75PercentIcon';

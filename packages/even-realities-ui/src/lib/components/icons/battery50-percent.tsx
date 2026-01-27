import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type Battery50PercentIconProps = Omit<IconBaseProps, 'viewBox'>;
export const Battery50PercentIcon = React.forwardRef<SVGSVGElement, Battery50PercentIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="1126 213.648 32 32" title={title} {...props}>
      <path d="M1152 237.648H1129V235.648H1152V237.648ZM1129 235.648H1127V223.648H1129V235.648ZM1154 226.648H1156V232.648H1154V235.648H1152V223.648H1154V226.648ZM1134 233.648H1132V225.648H1134V233.648ZM1139 233.648H1137V225.648H1139V233.648ZM1152 223.648H1129V221.648H1152V223.648Z"/>
    </IconBase>
  ),
);

Battery50PercentIcon.displayName = 'Battery50PercentIcon';

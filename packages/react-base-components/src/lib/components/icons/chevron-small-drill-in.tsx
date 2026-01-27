import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface ChevronSmallDrillInIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const ChevronSmallDrillInIcon = React.forwardRef<SVGSVGElement, ChevronSmallDrillInIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="1124 106.925 32 32" title={title} {...props}>
      <path d="M1140 131.925H1138V129.925H1140V131.925ZM1142 129.925H1140V127.925H1142V129.925ZM1144 127.925H1142V125.925H1144V127.925ZM1146 125.925H1144V123.925H1146V125.925ZM1148 121.925V123.925H1146V121.925H1148ZM1146 121.925H1144V119.925H1146V121.925ZM1144 119.925H1142V117.925H1144V119.925ZM1142 117.925H1140V115.925H1142V117.925ZM1140 115.925H1138V113.925H1140V115.925Z"/>
    </IconBase>
  ),
);

ChevronSmallDrillInIcon.displayName = 'ChevronSmallDrillInIcon';

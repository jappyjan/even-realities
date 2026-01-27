import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface StudyIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const StudyIcon = React.forwardRef<SVGSVGElement, StudyIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="726 530.925 32 32" title={title} {...props}>
      <path d="M737 535.925V552.925H751V535.925H737ZM733 553.925H735V536.925H733V553.925ZM748 549.925H741V547.925H748V549.925ZM748 545.925H741V543.925H748V545.925ZM748 540.925H741V538.925H748V540.925ZM753 554.925H735V555.925H733V556.925H735V557.925H751V555.925H753V558.925H751V559.925H735V558.925H733V557.925H731V535.925H733V534.925H735V533.925H753V554.925Z"/>
    </IconBase>
  ),
);

StudyIcon.displayName = 'StudyIcon';

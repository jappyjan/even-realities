import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface AccessControlIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const AccessControlIcon = React.forwardRef<SVGSVGElement, AccessControlIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="858 318.925 32 32" title={title} {...props}>
      <path d="M884 347.925H864V345.925H884V347.925ZM864 345.925H862V332.925H864V345.925ZM886 345.925H884V332.925H886V345.925ZM875 342.925H873V340.925H875V342.925ZM873 340.925H871V337.925H873V340.925ZM877 340.925H875V337.925H877V340.925ZM875 337.925H873V335.925H875V337.925ZM870 330.925H884V332.925H864V330.925H868V323.925H870V330.925ZM880 327.925H878V323.925H880V327.925ZM878 323.925H870V321.925H878V323.925Z"/>
    </IconBase>
  ),
);

AccessControlIcon.displayName = 'AccessControlIcon';

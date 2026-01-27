import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type ShiftToTopIconProps = Omit<IconBaseProps, 'viewBox'>;
export const ShiftToTopIcon = React.forwardRef<SVGSVGElement, ShiftToTopIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="994 212.925 32 32" title={title} {...props}>
      <path d="M1020 238.925H1018V236.925H1020V238.925ZM1018 236.925H1016V234.925H1018V236.925ZM1016 234.925H1014V232.925H1016V234.925ZM1016 220.925H1002V233.925H1000V218.925H1016V220.925ZM1014 232.925H1012V230.925H1014V232.925ZM1012 230.925H1010V228.925H1012V230.925ZM1010 228.925H1008V226.925H1010V228.925ZM1008 226.925H1006V224.925H1008V226.925ZM1006 224.925H1004V222.925H1006V224.925Z"/>
    </IconBase>
  ),
);

ShiftToTopIcon.displayName = 'ShiftToTopIcon';

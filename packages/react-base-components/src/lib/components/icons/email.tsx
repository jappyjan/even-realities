import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface EmailIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const EmailIcon = React.forwardRef<SVGSVGElement, EmailIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="858 212.925 32 32" title={title} {...props}>
      <path d="M886 238.925H862V236.925H886V238.925ZM886 220.925H888V236.925H886V222.925H884V220.925H864V222.925H862V236.925H860V220.925H862V218.925H886V220.925ZM878 230.925H870V228.925H878V230.925ZM870 228.925H868V226.925H870V228.925ZM880 228.925H878V226.925H880V228.925ZM868 226.925H866V224.925H868V226.925ZM882 226.925H880V224.925H882V226.925ZM866 224.925H864V222.925H866V224.925ZM884 224.925H882V222.925H884V224.925Z"/>
    </IconBase>
  ),
);

EmailIcon.displayName = 'EmailIcon';

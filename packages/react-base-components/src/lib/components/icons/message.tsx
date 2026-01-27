import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface MessageIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const MessageIcon = React.forwardRef<SVGSVGElement, MessageIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="990 318.925 32 32" title={title} {...props}>
      <path d="M995 349.925H993V347.925H995V349.925ZM997 347.925H995V345.925H997V347.925ZM995 345.925H993V323.925H995V345.925ZM999 345.925H997V343.925H999V345.925ZM1017 343.925H999V341.925H1017V343.925ZM1019 323.925V341.925H1017V323.925H1019ZM1013 336.925H999V334.925H1013V336.925ZM1013 330.925H999V328.925H1013V330.925ZM1017 323.925H995V321.925H1017V323.925Z"/>
    </IconBase>
  ),
);

MessageIcon.displayName = 'MessageIcon';

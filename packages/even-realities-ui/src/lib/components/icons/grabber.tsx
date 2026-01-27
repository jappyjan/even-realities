import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type GrabberIconProps = Omit<IconBaseProps, 'viewBox'>;
export const GrabberIcon = React.forwardRef<SVGSVGElement, GrabberIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="1126 319.648 32 32" title={title} {...props}>
      <path d="M1154 344.648H1130V342.648H1154V344.648ZM1154 336.648H1130V334.648H1154V336.648ZM1154 328.648H1130V326.648H1154V328.648Z"/>
    </IconBase>
  ),
);

GrabberIcon.displayName = 'GrabberIcon';

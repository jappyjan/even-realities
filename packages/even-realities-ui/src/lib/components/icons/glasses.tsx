import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface GlassesIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const GlassesIcon = React.forwardRef<SVGSVGElement, GlassesIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="202 107.648 32 32" title={title} {...props}>
      <path d="M213.999 129.65H205.999V127.65H213.999V129.65ZM230.001 129.65H222.001V127.65H230.001V129.65ZM220 121.65H220.001V123.65H216.002V127.648H214.002V123.648H216.001V119.647H220V121.65ZM222.002 127.648H220.002V123.648H222.002V127.648ZM215.999 119.648H206V127.647H204V119.647H205.999V117.648H215.999V119.648ZM230.002 119.647H232V127.647H230V119.648H220.002V117.648H230.002V119.647Z"/>
    </IconBase>
  ),
);

GlassesIcon.displayName = 'GlassesIcon';

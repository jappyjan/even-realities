import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface GlassesBatteryIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const GlassesBatteryIcon = React.forwardRef<SVGSVGElement, GlassesBatteryIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="334 107.648 32 32" title={title} {...props}>
      <path d="M362 132.648H352V130.648H362V132.648ZM352 130.648H350V125.648H352V130.648ZM364 126.648H365V129.648H364V130.648H362V125.648H364V126.648ZM345.999 127.65H337.999V125.65H345.999V127.65ZM351.999 119.65H352.001V121.65H348.001V125.648H346.001V121.648H348.001V117.647H351.999V119.65ZM362 125.648H352V123.648H362V125.648ZM347.999 117.648H338V125.647H336V117.647H337.999V115.648H347.999V117.648ZM362.002 117.648H364V121.648H362V117.648H352.002V115.648H362.002V117.648Z"/>
    </IconBase>
  ),
);

GlassesBatteryIcon.displayName = 'GlassesBatteryIcon';

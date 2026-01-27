import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type DotIconProps = Omit<IconBaseProps, 'viewBox'>;
export const DotIcon = React.forwardRef<SVGSVGElement, DotIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="598 425.648 32 32" title={title} {...props}>
      <path d="M616 439.648H617V443.648H616V444.648H612V443.648H611V439.648H612V438.648H616V439.648Z"/>
    </IconBase>
  ),
);

DotIcon.displayName = 'DotIcon';

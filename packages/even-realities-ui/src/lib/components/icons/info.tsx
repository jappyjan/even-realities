import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type InfoIconProps = Omit<IconBaseProps, 'viewBox'>;
export const InfoIcon = React.forwardRef<SVGSVGElement, InfoIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="862 319.648 32 32" title={title} {...props}>
      <path d="M888 347.648H868V345.648H888V347.648ZM868 345.648H866V325.648H868V345.648ZM890 345.648H888V325.648H890V345.648ZM879 340.648H880V342.648H876V340.648H877V334.648H876V332.648H879V340.648ZM879 330.648H877V328.648H879V330.648ZM888 325.648H868V323.648H888V325.648Z"/>
    </IconBase>
  ),
);

InfoIcon.displayName = 'InfoIcon';

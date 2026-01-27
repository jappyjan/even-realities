import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface FAQsIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const FAQsIcon = React.forwardRef<SVGSVGElement, FAQsIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="730 319.648 32 32" title={title} {...props}>
      <path d="M756 347.648H736V345.648H756V347.648ZM736 345.648H734V325.648H736V345.648ZM758 345.648H756V325.648H758V345.648ZM747 343.648H745V341.648H747V343.648ZM747 340.648H745V335.648H747V340.648ZM749 335.648H747V333.648H749V335.648ZM743 333.648H741V329.648H743V333.648ZM751 333.648H749V329.648H751V333.648ZM749 329.648H743V327.648H749V329.648ZM756 325.648H736V323.648H756V325.648Z"/>
    </IconBase>
  ),
);

FAQsIcon.displayName = 'FAQsIcon';

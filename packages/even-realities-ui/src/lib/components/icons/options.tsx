import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type OptionsIconProps = Omit<IconBaseProps, 'viewBox'>;
export const OptionsIcon = React.forwardRef<SVGSVGElement, OptionsIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="597 424.925 32 32" title={title} {...props}>
      <path d="M603 449.925H599V447.925H603V449.925ZM627 449.925H606V447.925H627V449.925ZM603 441.925H599V439.925H603V441.925ZM627 441.925H606V439.925H627V441.925ZM603 433.925H599V431.925H603V433.925ZM627 433.925H606V431.925H627V433.925Z"/>
    </IconBase>
  ),
);

OptionsIcon.displayName = 'OptionsIcon';

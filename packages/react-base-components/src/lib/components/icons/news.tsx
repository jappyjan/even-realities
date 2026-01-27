import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface NewsIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const NewsIcon = React.forwardRef<SVGSVGElement, NewsIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="330 424.925 32 32" title={title} {...props}>
      <path d="M355.5 451.925V453.925H334.5V451.925H355.5ZM355.5 447.925H353.5V429.925H334.5V451.925H332.5V427.925H355.5V447.925ZM357.5 451.925H355.5V449.925H357.5V451.925ZM359.5 449.925H357.5V433.925H359.5V449.925ZM350.5 447.925H337.5V445.925H350.5V447.925ZM350.5 441.925H337.5V439.925H350.5V441.925ZM340.5 435.925H337.5V433.925H340.5V435.925ZM350.5 435.925H343.5V433.925H350.5V435.925Z"/>
    </IconBase>
  ),
);

NewsIcon.displayName = 'NewsIcon';

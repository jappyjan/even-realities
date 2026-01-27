import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type ChevronSmallBackIconProps = Omit<IconBaseProps, 'viewBox'>;
export const ChevronSmallBackIcon = React.forwardRef<SVGSVGElement, ChevronSmallBackIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="862 106.925 32 32" title={title} {...props}>
      <path d="M882 131.925H880V129.925H882V131.925ZM880 129.925H878V127.925H880V129.925ZM878 127.925H876V125.925H878V127.925ZM876 125.925H874V123.925H876V125.925ZM874 121.925V123.925H872V121.925H874ZM876 121.925H874V119.925H876V121.925ZM878 119.925H876V117.925H878V119.925ZM880 117.925H878V115.925H880V117.925ZM882 115.925H880V113.925H882V115.925Z"/>
    </IconBase>
  ),
);

ChevronSmallBackIcon.displayName = 'ChevronSmallBackIcon';

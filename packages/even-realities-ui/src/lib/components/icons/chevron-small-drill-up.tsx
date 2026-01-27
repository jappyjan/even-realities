import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type ChevronSmallDrillUpIconProps = Omit<IconBaseProps, 'viewBox'>;
export const ChevronSmallDrillUpIcon = React.forwardRef<SVGSVGElement, ChevronSmallDrillUpIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="334 106.925 32 32" title={title} {...props}>
      <path d="M343 126.925H341V124.925H343V126.925ZM359 126.925H357V124.925H359V126.925ZM345 124.925H343V122.925H345V124.925ZM357 124.925H355V122.925H357V124.925ZM347 122.925H345V120.925H347V122.925ZM355 122.925H353V120.925H355V122.925ZM349 120.925H347V118.925H349V120.925ZM353 120.925H351V118.925H353V120.925ZM351 116.925V118.925H349V116.925H351Z"/>
    </IconBase>
  ),
);

ChevronSmallDrillUpIcon.displayName = 'ChevronSmallDrillUpIcon';

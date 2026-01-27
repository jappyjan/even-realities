import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface ChevronSmallDrillDownIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const ChevronSmallDrillDownIcon = React.forwardRef<SVGSVGElement, ChevronSmallDrillDownIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="598 106.925 32 32" title={title} {...props}>
      <path d="M615 126.925V128.925H613V126.925H615ZM613 126.925H611V124.925H613V126.925ZM617 126.925H615V124.925H617V126.925ZM611 124.925H609V122.925H611V124.925ZM619 124.925H617V122.925H619V124.925ZM609 122.925H607V120.925H609V122.925ZM621 122.925H619V120.925H621V122.925ZM607 120.925H605V118.925H607V120.925ZM623 120.925H621V118.925H623V120.925Z"/>
    </IconBase>
  ),
);

ChevronSmallDrillDownIcon.displayName = 'ChevronSmallDrillDownIcon';

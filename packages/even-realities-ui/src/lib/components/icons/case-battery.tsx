import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type CaseBatteryIconProps = Omit<IconBaseProps, 'viewBox'>;
export const CaseBatteryIcon = React.forwardRef<SVGSVGElement, CaseBatteryIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="730 107.648 32 32" title={title} {...props}>
      <path d="M758 133.648H748V131.648H758V133.648ZM744 131.648H734V129.648H744V131.648ZM748 131.648H746V126.648H748V131.648ZM760 127.648H761V130.648H760V131.648H758V126.648H760V127.648ZM734 125.648H744V127.648H734V129.648H732V116.648H734V125.648ZM758 126.648H748V124.648H758V126.648ZM748 123.648H744V121.648H748V123.648ZM760 122.648H758V116.648H760V122.648ZM758 116.648H734V114.648H758V116.648Z"/>
    </IconBase>
  ),
);

CaseBatteryIcon.displayName = 'CaseBatteryIcon';

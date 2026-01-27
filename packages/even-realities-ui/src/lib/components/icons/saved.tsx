import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type SavedIconProps = Omit<IconBaseProps, 'viewBox'>;
export const SavedIcon = React.forwardRef<SVGSVGElement, SavedIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="994 637.648 32 32" title={title} {...props}>
      <path d="M1003 663.648H1006V665.648H1003V666.648H1001V643.648H1003V663.648ZM1019 666.648H1017V665.648H1014V663.648H1017V643.648H1019V666.648ZM1009 663.648H1006V661.648H1009V663.648ZM1014 663.648H1011V661.648H1014V663.648ZM1011 661.648H1009V659.648H1011V661.648ZM1017 643.648H1003V641.648H1017V643.648Z"/>
    </IconBase>
  ),
);

SavedIcon.displayName = 'SavedIcon';

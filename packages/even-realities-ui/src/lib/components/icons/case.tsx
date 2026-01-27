import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type CaseIconProps = Omit<IconBaseProps, 'viewBox'>;
export const CaseIcon = React.forwardRef<SVGSVGElement, CaseIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="598 107.648 32 32" title={title} {...props}>
      <path d="M626 131.648H602V129.648H626V131.648ZM602 125.648H626V116.648H628V129.648H626V127.648H602V129.648H600V116.648H602V125.648ZM616 123.648H612V121.648H616V123.648ZM626 116.648H602V114.648H626V116.648Z"/>
    </IconBase>
  ),
);

CaseIcon.displayName = 'CaseIcon';

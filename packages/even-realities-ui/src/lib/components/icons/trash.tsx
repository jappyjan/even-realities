import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type TrashIconProps = Omit<IconBaseProps, 'viewBox'>;
export const TrashIcon = React.forwardRef<SVGSVGElement, TrashIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="333 212.925 32 32" title={title} {...props}>
      <path d="M357 242.925H341V240.925H357V242.925ZM341 240.925H339V222.925H341V240.925ZM359 240.925H357V222.925H359V240.925ZM347 238.925H345V222.925H347V238.925ZM353 238.925H351V222.925H353V238.925ZM345 218.925H353V216.925H355V218.925H361V220.925H337V218.925H343V216.925H345V218.925ZM353 216.925H345V214.925H353V216.925Z"/>
    </IconBase>
  ),
);

TrashIcon.displayName = 'TrashIcon';

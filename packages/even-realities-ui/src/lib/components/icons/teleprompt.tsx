import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type TelepromptIconProps = Omit<IconBaseProps, 'viewBox'>;
export const TelepromptIcon = React.forwardRef<SVGSVGElement, TelepromptIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="330 106.925 32 32" title={title} {...props}>
      <path d="M359 134.925H333V132.925H359V134.925ZM335 128.425H333V126.425H335V128.425ZM359 127.925H342V125.925H359V127.925ZM337 126.425H335V124.425H337V126.425ZM339 124.425H337V122.425H339V124.425ZM337 122.425H335V120.425H337V122.425ZM359 120.925H342V118.925H359V120.925ZM335 120.425H333V118.425H335V120.425ZM359 113.925H333V111.925H359V113.925Z"/>
    </IconBase>
  ),
);

TelepromptIcon.displayName = 'TelepromptIcon';

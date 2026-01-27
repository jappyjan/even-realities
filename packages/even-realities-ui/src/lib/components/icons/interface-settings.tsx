import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface InterfaceSettingsIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const InterfaceSettingsIcon = React.forwardRef<SVGSVGElement, InterfaceSettingsIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="726 106.925 32 32" title={title} {...props}>
      <path d="M755 134.925H753V131.925H755V134.925ZM747 131.925H730V129.925H747V131.925ZM753 131.925H750V129.925H753V131.925ZM758 131.925H755V129.925H758V131.925ZM730 129.925H728V114.925H730V129.925ZM755 129.925H753V126.925H755V129.925ZM750 125.925H733V123.925H750V125.925ZM755 123.925H753V114.925H755V123.925ZM750 120.925H733V118.925H750V120.925ZM753 114.925H730V112.925H753V114.925Z"/>
    </IconBase>
  ),
);

InterfaceSettingsIcon.displayName = 'InterfaceSettingsIcon';

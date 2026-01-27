import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type EvenAIIconProps = Omit<IconBaseProps, 'viewBox'>;
export const EvenAIIcon = React.forwardRef<SVGSVGElement, EvenAIIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="594 106.925 32 32" title={title} {...props}>
      <path d="M611 136.925H609V108.925H611V136.925ZM604.5 130.925H602.5V114.925H604.5V130.925ZM617.5 130.925H615.5V114.925H617.5V130.925ZM598 126.925H596V118.925H598V126.925ZM624 126.925H622V118.925H624V126.925Z"/>
    </IconBase>
  ),
);

EvenAIIcon.displayName = 'EvenAIIcon';

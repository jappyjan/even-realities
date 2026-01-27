import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type NavigateIconProps = Omit<IconBaseProps, 'viewBox'>;
export const NavigateIcon = React.forwardRef<SVGSVGElement, NavigateIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="462 106.925 32 32" title={title} {...props}>
      <path d="M468 136.925H466V118.925H468V136.925ZM484 126.925H482V124.925H484V126.925ZM486 124.925H484V122.925H486V124.925ZM488 122.925H486V120.925H488V122.925ZM490 120.925H488V118.925H490V120.925ZM488 118.925H468V116.925H488V118.925ZM492 118.925H490V116.925H492V118.925ZM490 116.925H488V114.925H490V116.925ZM488 114.925H486V112.925H488V114.925ZM486 112.925H484V110.925H486V112.925ZM484 108.925V110.925H482V108.925H484Z"/>
    </IconBase>
  ),
);

NavigateIcon.displayName = 'NavigateIcon';

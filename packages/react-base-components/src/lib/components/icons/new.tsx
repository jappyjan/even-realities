import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface NewIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const NewIcon = React.forwardRef<SVGSVGElement, NewIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="861 106.925 32 32" title={title} {...props}>
      <path d="M887 136.925H867V134.925H887V136.925ZM867 134.925H865V110.925H867V134.925ZM889 134.925H887V114.925H889V134.925ZM878 128.93H876V123.93H878V128.93ZM878 121.93H876.005V123.925H871.005V121.925H876V116.93H878V121.93ZM883.005 123.925H878.005V121.925H883.005V123.925ZM885 112.925H887V114.925H883V110.925H885V112.925ZM883 110.925H867V108.925H883V110.925Z"/>
    </IconBase>
  ),
);

NewIcon.displayName = 'NewIcon';

import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface TranscribeIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const TranscribeIcon = React.forwardRef<SVGSVGElement, TranscribeIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="990 106.925 32 32" title={title} {...props}>
      <path d="M1013 129.925H1007V134.925H1010V136.925H1002V134.925H1005V129.925H999V127.925H1013V129.925ZM999 127.925H997V125.925H999V127.925ZM1015 127.925H1013V125.925H1015V127.925ZM997 125.925H995V117.925H997V125.925ZM1017 125.925H1015V117.925H1017V125.925ZM1010 124.925H1002V122.925H1010V124.925ZM1002 122.925H1000V110.925H1002V122.925ZM1012 122.925H1010V110.925H1012V122.925ZM1010 110.925H1002V108.925H1010V110.925Z"/>
    </IconBase>
  ),
);

TranscribeIcon.displayName = 'TranscribeIcon';

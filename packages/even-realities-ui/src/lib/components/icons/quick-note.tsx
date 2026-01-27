import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type QuickNoteIconProps = Omit<IconBaseProps, 'viewBox'>;
export const QuickNoteIcon = React.forwardRef<SVGSVGElement, QuickNoteIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="858 106.925 32 32" title={title} {...props}>
      <path d="M880 136.925H864V134.925H880V136.925ZM864 134.925H862V110.925H864V134.925ZM884 132.925H882V134.925H880V130.925H884V132.925ZM886 110.925V130.925H884V110.925H886ZM876 129.925H867V127.925H876V129.925ZM880 123.925H867V121.925H880V123.925ZM881 117.925H867V115.925H881V117.925ZM884 110.925H864V108.925H884V110.925Z"/>
    </IconBase>
  ),
);

QuickNoteIcon.displayName = 'QuickNoteIcon';

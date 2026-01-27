import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type MultiSelectionIconProps = Omit<IconBaseProps, 'viewBox'>;
export const MultiSelectionIcon = React.forwardRef<SVGSVGElement, MultiSelectionIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="465 424.925 32 32" title={title} {...props}>
      <path d="M490 452.925H488V450.925H490V452.925ZM472 450.925H468V448.925H472V450.925ZM484 450.925H475V448.925H484V450.925ZM488 450.925H486V448.925H488V450.925ZM492 450.925H490V448.925H492V450.925ZM494 448.925H492V446.925H494V448.925ZM496 446.925H494V444.925H496V446.925ZM472 441.925H468V439.925H472V441.925ZM493 441.925H475V439.925H493V441.925ZM472 432.925H468V430.925H472V432.925ZM493 432.925H475V430.925H493V432.925Z"/>
    </IconBase>
  ),
);

MultiSelectionIcon.displayName = 'MultiSelectionIcon';

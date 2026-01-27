import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type LanguagesIconProps = Omit<IconBaseProps, 'viewBox'>;
export const LanguagesIcon = React.forwardRef<SVGSVGElement, LanguagesIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="198 318.925 32 32" title={title} {...props}>
      <path d="M208 340.925H200V338.925H206V336.925H200V338.925H198V334.925H206V332.925H208V340.925ZM218 340.925H212V338.925H218V340.925ZM230 340.925H224V338.925H230V340.925ZM212 330.925H218V332.925H212V338.925H210V326.925H212V330.925ZM220 338.925H218V332.925H220V338.925ZM224 338.925H222V332.925H224V338.925ZM206 332.925H200V330.925H206V332.925ZM230 332.925H224V330.925H230V332.925Z"/>
    </IconBase>
  ),
);

LanguagesIcon.displayName = 'LanguagesIcon';

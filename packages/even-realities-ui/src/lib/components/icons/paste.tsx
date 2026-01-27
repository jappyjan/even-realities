import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface PasteIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const PasteIcon = React.forwardRef<SVGSVGElement, PasteIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="201 212.925 32 32" title={title} {...props}>
      <path d="M221 242.925H205V240.925H221V242.925ZM205 240.925H203V220.925H205V240.925ZM229 238.925H223V240.925H221V238.925H213V236.925H229V238.925ZM213 236.925H211V220.925H205V218.925H211V216.925H213V236.925ZM231 236.925H229V216.925H231V236.925ZM227 231.925H215V229.925H227V231.925ZM227 227.925H215V225.925H227V227.925ZM227 223.925H215V221.925H227V223.925ZM229 216.925H213V214.925H229V216.925Z"/>
    </IconBase>
  ),
);

PasteIcon.displayName = 'PasteIcon';

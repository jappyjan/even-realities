import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface StandIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const StandIcon = React.forwardRef<SVGSVGElement, StandIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="333.046 106.85 32 32" title={title} {...props}>
      <path d="M346 128.85V136.85H344V128.85H346ZM354 136.85H352V128.85H354V136.85ZM348 128.85H346V126.85H348V128.85ZM352 128.85H350V126.85H352V128.85ZM350 126.85H348V116.85H350V126.85ZM345 123.85H343V116.85H345V123.85ZM355 123.85H353V116.85H355V123.85ZM352 114.85H353V116.85H351V114.85H347V116.85H345V114.85H346V112.85H352V114.85ZM350.667 111.517H348V108.85H350.667V111.517Z"/>
    </IconBase>
  ),
);

StandIcon.displayName = 'StandIcon';

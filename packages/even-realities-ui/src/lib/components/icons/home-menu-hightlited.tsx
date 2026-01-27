import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type HomeMenuHightlitedIconProps = Omit<IconBaseProps, 'viewBox'>;
export const HomeMenuHightlitedIcon = React.forwardRef<SVGSVGElement, HomeMenuHightlitedIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="334 106.925 32 32" title={title} {...props}>
      <path d="M351 111.925H353V113.925H355V115.925H357V117.925H359V119.925H361V121.925H363V123.925H361V133.925H359V135.925H341V133.925H339V123.925H337V121.925H339V119.925H341V117.925H343V115.925H345V113.925H347V111.925H349V109.925H351V111.925ZM347 129.925H353V126.925H347V129.925ZM337 125.925H335V123.925H337V125.925ZM365 125.925H363V123.925H365V125.925Z"/>
    </IconBase>
  ),
);

HomeMenuHightlitedIcon.displayName = 'HomeMenuHightlitedIcon';

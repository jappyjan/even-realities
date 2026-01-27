import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export interface SleepIconProps extends Omit<IconBaseProps, 'viewBox'> {}

export const SleepIcon = React.forwardRef<SVGSVGElement, SleepIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="1126 106.833 32 32" title={title} {...props}>
      <path d="M1130 126.833H1141V120.833H1143V126.833H1154V120.833H1156V131.833H1154V128.833H1130V132.833H1128V112.833H1130V126.833ZM1137 123.833H1134V121.833H1137V123.833ZM1134 121.833H1132V118.833H1134V121.833ZM1139 121.833H1137V118.833H1139V121.833ZM1154 120.833H1143V118.833H1154V120.833ZM1137 116.833V118.833H1134V116.833H1137Z"/>
    </IconBase>
  ),
);

SleepIcon.displayName = 'SleepIcon';

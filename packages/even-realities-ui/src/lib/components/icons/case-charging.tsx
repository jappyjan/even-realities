import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type CaseChargingIconProps = Omit<IconBaseProps, 'viewBox'>;
export const CaseChargingIcon = React.forwardRef<SVGSVGElement, CaseChargingIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="862 107.648 32 32" title={title} {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M866 129.648L876 129.648L876 131.648L866 131.648L866 129.648Z"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M866 114.648L890 114.648L890 116.648L866 116.648L866 114.648Z"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M866 125.648L876 125.648L876 127.648L866 127.648L866 125.648Z"/>
      <rect x="864" y="116.648" width="2" height="13"/>
      <rect x="890" y="116.648" width="2" height="6"/>
      <rect x="876" y="121.648" width="4" height="2"/>
      <path d="M880 124.648H890V126.648H880V124.648Z"/>
      <path d="M880 126.648H890V131.648H880V126.648Z"/>
      <path d="M880 131.648H890V133.648H880V131.648Z"/>
      <path d="M890 126.648H892V131.648H890V126.648Z"/>
      <path d="M892 127.648H893V130.648H892V127.648Z"/>
      <rect x="878" y="126.648" width="2" height="5"/>
    </IconBase>
  ),
);

CaseChargingIcon.displayName = 'CaseChargingIcon';

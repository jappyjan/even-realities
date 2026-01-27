import * as React from 'react';

import { IconBase, IconBaseProps } from './icon-base';

export type FileIconProps = Omit<IconBaseProps, 'viewBox'>;
export const FileIcon = React.forwardRef<SVGSVGElement, FileIconProps>(
  ({ title, ...props }, ref) => (
    <IconBase ref={ref} viewBox="466 743.648 32 32" title={title} {...props}>
      <path d="M487 773.648H473V771.648H487V773.648ZM473 771.648H471V747.648H473V771.648ZM491 769.648H489V771.648H487V767.648H491V769.648ZM493 767.648H491V747.648H493V767.648ZM491 747.648H473V745.648H491V747.648Z"/>
    </IconBase>
  ),
);

FileIcon.displayName = 'FileIcon';

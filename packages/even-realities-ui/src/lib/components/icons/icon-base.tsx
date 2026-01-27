import * as React from 'react';

export interface IconBaseProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
  viewBox: string;
}

export const IconBase = React.forwardRef<SVGSVGElement, IconBaseProps>(
  ({ size = 32, title, viewBox, children, ...props }, ref) => {
    const ariaProps = title
      ? { role: 'img', 'aria-label': title }
      : { 'aria-hidden': true };
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={viewBox}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...ariaProps}
        {...props}
      >
        {title ? <title>{title}</title> : null}
        {children}
      </svg>
    );
  },
);

IconBase.displayName = 'IconBase';

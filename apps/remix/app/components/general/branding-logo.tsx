import BbakLogo from '@documenso/assets/bbak-favicon.svg';
import BbakLogoDark from '@documenso/assets/bbak-logo-dark.svg';
import type { HTMLAttributes } from 'react';

export type LogoProps = HTMLAttributes<HTMLSpanElement>;

export const BrandingLogo = ({ className, ...props }: LogoProps) => {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ''}`} {...props}>
      <span className="light-logo inline-flex h-full items-center">
        <img src={BbakLogo} alt="B-BAK logo" className="h-full w-auto" />
      </span>
      <span className="dark-logo hidden h-full items-center">
        <img src={BbakLogoDark} alt="" aria-hidden="true" className="h-full w-auto" />
      </span>
    </span>
  );
};

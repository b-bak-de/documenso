import BbakLogo from '@documenso/assets/bbak-favicon.svg';
import BbakLogoDark from '@documenso/assets/bbak-logo-dark.svg';
import type { HTMLAttributes } from 'react';

export type LogoProps = HTMLAttributes<HTMLSpanElement>;

export const BrandingLogoIcon = ({ className, ...props }: LogoProps) => {
  return (
    <span className={`inline-flex items-center ${className ?? ''}`} {...props}>
      <img src={BbakLogo} alt="B-BAK logo" className="light-logo h-full w-auto" />
      <img src={BbakLogoDark} alt="" aria-hidden="true" className="dark-logo hidden h-full w-auto" />
    </span>
  );
};

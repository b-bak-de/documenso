import { cn } from '@documenso/ui/lib/utils';

import { Trans } from '@lingui/react/macro';
import type { HTMLAttributes } from 'react';

export type DocumentSigningDisclosureProps = HTMLAttributes<HTMLParagraphElement>;

export const DocumentSigningDisclosure = ({ className, ...props }: DocumentSigningDisclosureProps) => {
  return (
    <p className={cn('text-muted-foreground text-xs', className)} {...props}>
      <Trans>By continuing, you confirm that you wish to electronically sign the present document.</Trans>
      <span className="mt-2 block">
        <Trans>
          By completing the electronic signing process, you confirm your intention to make the statement contained in
          this document electronically.
        </Trans>
      </span>
      <span className="mt-2 block">
        <Trans>
          Read our{' '}
          <a
            className="text-documenso-700 underline"
            href="https://b-bak.de/datenschutz/#elektronische-unterzeichnung-von-dokumenten"
            target="_blank"
            rel="noreferrer"
          >
            privacy policy
          </a>
          .
        </Trans>
      </span>
    </p>
  );
};

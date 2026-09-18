import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { BbakEmailLayout } from '../template-components/bbak-email-layout';
import type { TemplateRecipientExpiredProps } from '../template-components/template-recipient-expired';
import { TemplateRecipientExpired } from '../template-components/template-recipient-expired';

export type RecipientExpiredEmailTemplateProps = Partial<TemplateRecipientExpiredProps>;

export const RecipientExpiredTemplate = ({
  documentName = 'Open Source Pledge.pdf',
  recipientName = 'John Doe',
  recipientEmail = 'john@example.com',
  documentLink = 'https://documenso.com',
  assetBaseUrl = 'http://localhost:3002',
}: RecipientExpiredEmailTemplateProps) => {
  const { _ } = useLingui();

  const previewText = msg`The signing window for "${recipientName}" on document "${documentName}" has expired.`;

  return (
    <BbakEmailLayout assetBaseUrl={assetBaseUrl} previewText={_(previewText)}>
      <TemplateRecipientExpired
        documentName={documentName}
        recipientName={recipientName}
        recipientEmail={recipientEmail}
        documentLink={documentLink}
        assetBaseUrl={assetBaseUrl}
      />
    </BbakEmailLayout>
  );
};

export default RecipientExpiredTemplate;

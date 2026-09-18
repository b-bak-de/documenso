import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { BbakEmailLayout } from '../template-components/bbak-email-layout';
import { TemplateDocumentRecipientSigned } from '../template-components/template-document-recipient-signed';

export interface DocumentRecipientSignedEmailTemplateProps {
  documentName?: string;
  recipientName?: string;
  recipientEmail?: string;
  assetBaseUrl?: string;
}

export const DocumentRecipientSignedEmailTemplate = ({
  documentName = 'Open Source Pledge.pdf',
  recipientName = 'John Doe',
  recipientEmail = 'recipient@example.com',
  assetBaseUrl = 'http://localhost:3002',
}: DocumentRecipientSignedEmailTemplateProps) => {
  const { _ } = useLingui();

  const recipientReference = recipientName || recipientEmail;

  const previewText = msg`${recipientReference} has signed ${documentName}`;

  return (
    <BbakEmailLayout assetBaseUrl={assetBaseUrl} previewText={_(previewText)}>
      <TemplateDocumentRecipientSigned
        documentName={documentName}
        recipientName={recipientName}
        recipientEmail={recipientEmail}
        assetBaseUrl={assetBaseUrl}
      />
    </BbakEmailLayout>
  );
};

export default DocumentRecipientSignedEmailTemplate;

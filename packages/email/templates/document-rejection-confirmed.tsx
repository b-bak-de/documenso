import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { BbakEmailLayout } from '../template-components/bbak-email-layout';
import { TemplateDocumentRejectionConfirmed } from '../template-components/template-document-rejection-confirmed';

export type DocumentRejectionConfirmedEmailProps = {
  recipientName: string;
  documentName: string;
  documentOwnerName: string;
  reason: string;
  assetBaseUrl?: string;
};

export function DocumentRejectionConfirmedEmail({
  recipientName,
  documentName,
  documentOwnerName,
  reason,
  assetBaseUrl = 'http://localhost:3002',
}: DocumentRejectionConfirmedEmailProps) {
  const { _ } = useLingui();

  const previewText = _(msg`You have rejected the document '${documentName}'`);

  return (
    <BbakEmailLayout assetBaseUrl={assetBaseUrl} previewText={previewText}>
      <TemplateDocumentRejectionConfirmed
        recipientName={recipientName}
        documentName={documentName}
        documentOwnerName={documentOwnerName}
        reason={reason}
      />
    </BbakEmailLayout>
  );
}

export default DocumentRejectionConfirmedEmail;

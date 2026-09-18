import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { BbakEmailLayout } from '../template-components/bbak-email-layout';
import { TemplateDocumentRejected } from '../template-components/template-document-rejected';

type DocumentRejectedEmailProps = {
  recipientName: string;
  documentName: string;
  documentUrl: string;
  rejectionReason: string;
  assetBaseUrl?: string;
};

export function DocumentRejectedEmail({
  recipientName,
  documentName,
  documentUrl,
  rejectionReason,
  assetBaseUrl = 'http://localhost:3002',
}: DocumentRejectedEmailProps) {
  const { _ } = useLingui();

  const previewText = _(msg`${recipientName} has rejected the document '${documentName}'`);

  return (
    <BbakEmailLayout assetBaseUrl={assetBaseUrl} previewText={previewText}>
      <TemplateDocumentRejected
        recipientName={recipientName}
        documentName={documentName}
        documentUrl={documentUrl}
        rejectionReason={rejectionReason}
      />
    </BbakEmailLayout>
  );
}

export default DocumentRejectedEmail;

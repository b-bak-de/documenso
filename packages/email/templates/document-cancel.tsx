import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { BbakEmailLayout } from '../template-components/bbak-email-layout';
import type { TemplateDocumentCancelProps } from '../template-components/template-document-cancel';
import { TemplateDocumentCancel } from '../template-components/template-document-cancel';

export type DocumentCancelEmailTemplateProps = Partial<TemplateDocumentCancelProps>;

export const DocumentCancelTemplate = ({
  inviterName = 'Lucas Smith',
  inviterEmail = 'sender@example.com',
  documentName = 'Open Source Pledge.pdf',
  assetBaseUrl = 'http://localhost:3002',
  cancellationReason,
}: DocumentCancelEmailTemplateProps) => {
  const { _ } = useLingui();

  const previewText = msg`${inviterName} has cancelled the document ${documentName}, you don't need to sign it anymore.`;

  return (
    <BbakEmailLayout assetBaseUrl={assetBaseUrl} previewText={_(previewText)}>
      <TemplateDocumentCancel
        inviterName={inviterName}
        inviterEmail={inviterEmail}
        documentName={documentName}
        assetBaseUrl={assetBaseUrl}
        cancellationReason={cancellationReason}
      />
    </BbakEmailLayout>
  );
};

export default DocumentCancelTemplate;

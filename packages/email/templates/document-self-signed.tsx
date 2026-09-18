import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { BbakEmailLayout } from '../template-components/bbak-email-layout';
import type { TemplateDocumentSelfSignedProps } from '../template-components/template-document-self-signed';
import { TemplateDocumentSelfSigned } from '../template-components/template-document-self-signed';

export type DocumentSelfSignedTemplateProps = TemplateDocumentSelfSignedProps;

export const DocumentSelfSignedEmailTemplate = ({
  documentName = 'Open Source Pledge.pdf',
  assetBaseUrl = 'http://localhost:3002',
}: DocumentSelfSignedTemplateProps) => {
  const { _ } = useLingui();

  const previewText = msg`Completed Document`;

  return (
    <BbakEmailLayout assetBaseUrl={assetBaseUrl} previewText={_(previewText)}>
      <TemplateDocumentSelfSigned documentName={documentName} assetBaseUrl={assetBaseUrl} />
    </BbakEmailLayout>
  );
};

export default DocumentSelfSignedEmailTemplate;

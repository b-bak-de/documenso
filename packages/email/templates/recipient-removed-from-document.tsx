import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { Section, Text } from '../components';
import { BbakEmailLayout } from '../template-components/bbak-email-layout';
import type { TemplateDocumentCancelProps } from '../template-components/template-document-cancel';
import TemplateDocumentImage from '../template-components/template-document-image';

export type DocumentCancelEmailTemplateProps = Partial<TemplateDocumentCancelProps>;

export const RecipientRemovedFromDocumentTemplate = ({
  inviterName = 'Lucas Smith',
  documentName = 'Open Source Pledge.pdf',
  assetBaseUrl = 'http://localhost:3002',
}: DocumentCancelEmailTemplateProps) => {
  const { _ } = useLingui();

  const previewText = msg`${inviterName} has removed you from the document ${documentName}.`;

  return (
    <BbakEmailLayout assetBaseUrl={assetBaseUrl} previewText={_(previewText)}>
      <Section>
        <TemplateDocumentImage className="mt-6" assetBaseUrl={assetBaseUrl} />

        <Section>
          <Text className="mx-auto mb-0 max-w-[80%] text-center font-semibold text-foreground text-lg">
            <Trans>
              {inviterName} has removed you from the document
              <br />"{documentName}"
            </Trans>
          </Text>
        </Section>
      </Section>
    </BbakEmailLayout>
  );
};

export default RecipientRemovedFromDocumentTemplate;

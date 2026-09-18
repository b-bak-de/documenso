import { RECIPIENT_ROLES_DESCRIPTION } from '@documenso/lib/constants/recipient-roles';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import type { RecipientRole } from '@prisma/client';
import { OrganisationType } from '@prisma/client';

import { Section, Text } from '../components';
import { BbakEmailLayout } from '../template-components/bbak-email-layout';
import { TemplateCustomMessageBody } from '../template-components/template-custom-message-body';
import { TemplateDocumentInvite } from '../template-components/template-document-invite';

export type DocumentInviteEmailTemplateProps = {
  customBody?: string;
  documentName?: string;
  includeSenderDetails?: boolean;
  inviterEmail?: string;
  inviterName?: string;
  organisationType?: OrganisationType;
  recipientName?: string;
  reportUrl?: string;
  role: RecipientRole;
  selfSigner?: boolean;
  signDocumentLink?: string;
  teamEmail?: string;
  teamName?: string;
  assetBaseUrl?: string;
};

export const DocumentInviteEmailTemplate = ({
  customBody,
  documentName = 'Open Source Pledge.pdf',
  inviterEmail = 'sender@example.com',
  inviterName = 'Lucas Smith',
  includeSenderDetails,
  organisationType,
  role,
  selfSigner = false,
  signDocumentLink = 'https://b-bak.de',
  teamName = '',
  assetBaseUrl = 'http://localhost:3002',
}: DocumentInviteEmailTemplateProps) => {
  const { _ } = useLingui();
  const action = _(RECIPIENT_ROLES_DESCRIPTION[role].actionVerb).toLowerCase();
  const senderName = organisationType === OrganisationType.ORGANISATION ? teamName : inviterName;
  const previewText = selfSigner
    ? msg`Please ${action} your document ${documentName}`
    : msg`${senderName} has invited you to ${action} ${documentName}`;

  return (
    <BbakEmailLayout assetBaseUrl={assetBaseUrl} previewText={_(previewText)}>
      <TemplateDocumentInvite
        inviterName={inviterName}
        inviterEmail={inviterEmail ?? ''}
        documentName={documentName}
        signDocumentLink={signDocumentLink}
        assetBaseUrl={assetBaseUrl}
        role={role}
        selfSigner={selfSigner}
        organisationType={organisationType}
        teamName={teamName}
        includeSenderDetails={includeSenderDetails}
      />
      {customBody && (
        <Section>
          <Text className="text-muted">
            <TemplateCustomMessageBody text={customBody} />
          </Text>
        </Section>
      )}
    </BbakEmailLayout>
  );
};

export default DocumentInviteEmailTemplate;

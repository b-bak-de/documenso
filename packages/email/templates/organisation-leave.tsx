import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { Section, Text } from '../components';
import { BbakEmailLayout } from '../template-components/bbak-email-layout';
import TemplateImage from '../template-components/template-image';

export type OrganisationLeaveEmailProps = {
  assetBaseUrl: string;
  baseUrl: string;
  memberName: string;
  memberEmail: string;
  organisationName: string;
  organisationUrl: string;
};

export const OrganisationLeaveEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  baseUrl = 'https://b-bak.de',
  memberName = 'John Doe',
  memberEmail = 'member@example.com',
  organisationName = 'Organisation Name',
  organisationUrl = 'demo',
}: OrganisationLeaveEmailProps) => {
  const { _ } = useLingui();

  const previewText = msg`A member has left your organisation on B-BAK`;

  return (
    <BbakEmailLayout assetBaseUrl={assetBaseUrl} previewText={_(previewText)}>
      <Section>
        <TemplateImage className="mx-auto" assetBaseUrl={assetBaseUrl} staticAsset="delete-user.png" />
      </Section>

      <Section className="p-2 text-muted-foreground">
        <Text className="text-center font-medium text-foreground text-lg">
          <Trans>A member has left your organisation {organisationName}</Trans>
        </Text>

        <div className="mx-auto my-2 w-fit rounded-lg bg-muted px-4 py-2 font-medium text-base text-muted-foreground">
          {memberName || memberEmail}
        </div>
      </Section>
    </BbakEmailLayout>
  );
};

export default OrganisationLeaveEmailTemplate;

import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { Section, Text } from '../components';
import { BbakEmailLayout } from '../template-components/bbak-email-layout';
import TemplateImage from '../template-components/template-image';

export type OrganisationDeleteEmailProps = {
  assetBaseUrl: string;
  organisationName: string;
  /**
   * Whether the deletion was performed by an administrator (as opposed to the owner).
   * Slightly changes the wording in the email.
   */
  deletedByAdmin?: boolean;
};

export const OrganisationDeleteEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  organisationName = 'Organisation Name Placeholder',
  deletedByAdmin = false,
}: OrganisationDeleteEmailProps) => {
  const { _ } = useLingui();

  const previewText = msg`Your organisation has been deleted`;

  const title = msg`Your organisation has been deleted`;

  const description = deletedByAdmin
    ? msg`The following organisation has been deleted by an administrator. You and your members will no longer be able to access this organisation, its teams, or its associated data.`
    : msg`The following organisation has been deleted. You and your members will no longer be able to access this organisation, its teams, or its associated data.`;

  return (
    <BbakEmailLayout assetBaseUrl={assetBaseUrl} previewText={_(previewText)}>
      <Section>
        <TemplateImage className="mx-auto" assetBaseUrl={assetBaseUrl} staticAsset="delete-team.png" />
      </Section>

      <Section className="p-2 text-muted-foreground">
        <Text className="text-center font-medium text-foreground text-lg">{_(title)}</Text>

        <Text className="my-1 text-center text-base">{_(description)}</Text>

        <div className="mx-auto my-2 w-fit rounded-lg bg-muted px-4 py-2 font-medium text-base text-muted-foreground">
          {organisationName}
        </div>
      </Section>
    </BbakEmailLayout>
  );
};

export default OrganisationDeleteEmailTemplate;

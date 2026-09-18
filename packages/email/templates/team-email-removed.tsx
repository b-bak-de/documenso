import { formatTeamUrl } from '@documenso/lib/utils/teams';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { Section, Text } from '../components';
import { BbakEmailLayout } from '../template-components/bbak-email-layout';
import TemplateImage from '../template-components/template-image';

export type TeamEmailRemovedTemplateProps = {
  assetBaseUrl: string;
  baseUrl: string;
  teamEmail: string;
  teamName: string;
  teamUrl: string;
};

export const TeamEmailRemovedTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  baseUrl = 'https://b-bak.de',
  teamEmail = 'team@example.com',
  teamName = 'Team Name',
  teamUrl = 'demo',
}: TeamEmailRemovedTemplateProps) => {
  const { _ } = useLingui();

  const previewText = msg`Team email removed for ${teamName} on B-BAK`;

  return (
    <BbakEmailLayout assetBaseUrl={assetBaseUrl} previewText={_(previewText)}>
      <Section>
        <TemplateImage className="mx-auto" assetBaseUrl={assetBaseUrl} staticAsset="mail-open-alert.png" />
      </Section>

      <Section className="p-2 text-muted-foreground">
        <Text className="text-center font-medium text-foreground text-lg">
          <Trans>Team email removed</Trans>
        </Text>

        <Text className="my-1 text-center text-base">
          <Trans>
            The team email <span className="font-bold">{teamEmail}</span> has been removed from the following team
          </Trans>
        </Text>

        <div className="mx-auto mt-2 mb-6 w-fit rounded-lg bg-muted px-4 py-2 font-medium text-base text-muted-foreground">
          {formatTeamUrl(teamUrl, baseUrl)}
        </div>
      </Section>
    </BbakEmailLayout>
  );
};

export default TeamEmailRemovedTemplate;

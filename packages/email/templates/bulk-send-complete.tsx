import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { Section, Text } from '../components';
import { BbakEmailLayout } from '../template-components/bbak-email-layout';

export interface BulkSendCompleteEmailProps {
  userName: string;
  templateName: string;
  totalProcessed: number;
  successCount: number;
  failedCount: number;
  errors: string[];
  assetBaseUrl?: string;
}

export const BulkSendCompleteEmail = ({
  userName,
  templateName,
  totalProcessed,
  successCount,
  failedCount,
  errors,
  assetBaseUrl = 'http://localhost:3002',
}: BulkSendCompleteEmailProps) => {
  const { _ } = useLingui();

  const previewText = msg`Bulk send operation complete for template "${templateName}"`;

  return (
    <BbakEmailLayout assetBaseUrl={assetBaseUrl} previewText={_(previewText)}>
      <Section>
        <Text className="text-sm">
          <Trans>Hi {userName},</Trans>
        </Text>

        <Text className="text-sm">
          <Trans>Your bulk send operation for template "{templateName}" has completed.</Trans>
        </Text>

        <Text className="font-semibold text-lg">
          <Trans>Summary:</Trans>
        </Text>

        <ul className="my-2 ml-4 list-inside list-disc">
          <li>
            <Trans>Total rows processed: {totalProcessed}</Trans>
          </li>
          <li className="mt-1">
            <Trans>Successfully created: {successCount}</Trans>
          </li>
          <li className="mt-1">
            <Trans>Failed: {failedCount}</Trans>
          </li>
        </ul>

        {errors && errors.length > 0 && (
          <Section className="mt-4">
            <Text className="font-semibold text-lg">
              <Trans>The following errors occurred:</Trans>
            </Text>

            <ul className="my-2 ml-4 list-inside list-disc">
              {errors.map((error, index) => (
                <li key={index} className="mt-1 text-destructive text-sm">
                  {error}
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Text className="text-sm">
          <Trans>
            You can view the created documents in your dashboard under the "Documents created from template" section.
          </Trans>
        </Text>
      </Section>
    </BbakEmailLayout>
  );
};

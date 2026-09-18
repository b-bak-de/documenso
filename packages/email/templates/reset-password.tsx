import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';

import { Link, Section, Text } from '../components';
import { BbakEmailLayout } from '../template-components/bbak-email-layout';
import type { TemplateResetPasswordProps } from '../template-components/template-reset-password';
import { TemplateResetPassword } from '../template-components/template-reset-password';

export type ResetPasswordTemplateProps = Partial<TemplateResetPasswordProps>;

export const ResetPasswordTemplate = ({
  userName = 'Lucas Smith',
  userEmail = 'user@example.com',
  assetBaseUrl = 'http://localhost:3002',
}: ResetPasswordTemplateProps) => {
  const { _ } = useLingui();

  const previewText = msg`Password Reset Successful`;

  return (
    <BbakEmailLayout assetBaseUrl={assetBaseUrl} previewText={_(previewText)}>
      <Section>
        <TemplateResetPassword userName={userName} userEmail={userEmail} assetBaseUrl={assetBaseUrl} />
        <Text className="my-4 font-semibold text-base">
          <Trans>
            Hi, {userName}{' '}
            <Link className="font-normal text-muted-foreground" href={`mailto:${userEmail}`}>
              ({userEmail})
            </Link>
          </Trans>
        </Text>

        <Text className="mt-2 text-base text-muted-foreground">
          <Trans>We've changed your password as you asked. You can now sign in with your new password.</Trans>
        </Text>
        <Text className="mt-2 text-base text-muted-foreground">
          <Trans>
            Didn't request a password change? We are here to help you secure your account, just{' '}
            <Link className="font-normal text-primary" href="mailto:info@b-bak.de">
              contact us
            </Link>
            .
          </Trans>
        </Text>
      </Section>
    </BbakEmailLayout>
  );
};

export default ResetPasswordTemplate;

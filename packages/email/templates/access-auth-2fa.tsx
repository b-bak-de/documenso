import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { BbakEmailLayout } from '../template-components/bbak-email-layout';
import { TemplateAccessAuth2FA } from '../template-components/template-access-auth-2fa';

export type AccessAuth2FAEmailTemplateProps = {
  documentTitle: string;
  code: string;
  userEmail: string;
  userName: string;
  expiresInMinutes: number;
  assetBaseUrl?: string;
};

export const AccessAuth2FAEmailTemplate = ({
  documentTitle,
  code,
  userEmail,
  userName,
  expiresInMinutes,
  assetBaseUrl = 'http://localhost:3002',
}: AccessAuth2FAEmailTemplateProps) => {
  const { _ } = useLingui();

  const previewText = msg`Your verification code is ${code}`;

  return (
    <BbakEmailLayout assetBaseUrl={assetBaseUrl} previewText={_(previewText)}>
      <TemplateAccessAuth2FA
        documentTitle={documentTitle}
        code={code}
        userEmail={userEmail}
        userName={userName}
        expiresInMinutes={expiresInMinutes}
        assetBaseUrl={assetBaseUrl}
      />
    </BbakEmailLayout>
  );
};

export default AccessAuth2FAEmailTemplate;

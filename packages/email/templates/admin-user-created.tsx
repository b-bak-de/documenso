import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';

import { BbakEmailLayout } from '../template-components/bbak-email-layout';
import type { TemplateAdminUserCreatedProps } from '../template-components/template-admin-user-created';
import { TemplateAdminUserCreated } from '../template-components/template-admin-user-created';

export const AdminUserCreatedTemplate = ({
  resetPasswordLink,
  assetBaseUrl = 'http://localhost:3002',
}: TemplateAdminUserCreatedProps) => {
  const { _ } = useLingui();

  const previewText = msg`Set your password for B-BAK`;

  return (
    <BbakEmailLayout assetBaseUrl={assetBaseUrl} previewText={_(previewText)}>
      <TemplateAdminUserCreated resetPasswordLink={resetPasswordLink} assetBaseUrl={assetBaseUrl} />
    </BbakEmailLayout>
  );
};

export default AdminUserCreatedTemplate;

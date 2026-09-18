import { Badge } from '@documenso/ui/primitives/badge';
import { Separator } from '@documenso/ui/primitives/separator';
import { Plural, Trans } from '@lingui/react/macro';
import { RecipientRole } from '@prisma/client';
import { Link } from 'react-router';
import { match } from 'ts-pattern';

import { useEmbedSigningContext } from '~/components/embed/embed-signing-context';
import { BrandingLogo } from '~/components/general/branding-logo';

import { useRequiredEnvelopeSigningContext } from '../document-signing/envelope-signing-provider';
import { EnvelopeSignerCompleteDialog } from './envelope-signing-complete-dialog';

export const EnvelopeSignerHeader = () => {
  const { envelopeData, envelope, recipientFieldsRemaining, recipient } = useRequiredEnvelopeSigningContext();

  const isEmbedSigning = useEmbedSigningContext() !== null;
  const hasCustomBrandingLogo = envelopeData.settings.brandingEnabled && Boolean(envelopeData.settings.brandingLogo);

  return (
    <nav className="embed--DocumentWidgetHeader flex max-w-screen flex-row justify-between border-border border-b bg-background px-4 py-3 md:px-6">
      {/* Left side - Logo and title */}
      <div className="flex min-w-0 flex-1 items-center space-x-2 md:w-auto md:flex-none">
        {!isEmbedSigning &&
          (hasCustomBrandingLogo ? (
            <img
              src={`/api/branding/logo/team/${envelope.teamId}`}
              alt={`${envelope.team.name}'s Logo`}
              className="h-6 w-auto flex-shrink-0"
            />
          ) : (
            <Link to="/" className="flex-shrink-0">
              <BrandingLogo className="h-16 w-auto" />
            </Link>
          ))}

        <h1 title={envelope.title} className="min-w-0 truncate font-semibold text-base text-foreground md:hidden">
          {envelope.title}
        </h1>

        {!isEmbedSigning && <Separator orientation="vertical" className="hidden h-6 md:block" />}

        <div className="hidden items-center space-x-2 md:flex">
          <h1 className="whitespace-nowrap font-medium text-foreground text-sm">{envelope.title}</h1>

          <Badge>
            {match(recipient.role)
              .with(RecipientRole.VIEWER, () => <Trans>Viewer</Trans>)
              .with(RecipientRole.SIGNER, () => <Trans>Signer</Trans>)
              .with(RecipientRole.APPROVER, () => <Trans>Approver</Trans>)
              .with(RecipientRole.ASSISTANT, () => <Trans>Assistant</Trans>)
              .otherwise(() => null)}
          </Badge>
        </div>
      </div>

      {/* Right side - Desktop content */}
      <div className="hidden items-center space-x-2 lg:flex">
        <p className="mr-2 flex-shrink-0 text-muted-foreground text-sm">
          <Plural one="1 Field Remaining" other="# Fields Remaining" value={recipientFieldsRemaining.length} />
        </p>

        <EnvelopeSignerCompleteDialog />
      </div>
    </nav>
  );
};

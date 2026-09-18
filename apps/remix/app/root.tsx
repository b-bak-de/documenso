import { getOptionalSession } from '@documenso/auth/server/lib/utils/get-session';
import { useAnalytics } from '@documenso/lib/client-only/hooks/use-analytics';
import { SessionProvider } from '@documenso/lib/client-only/providers/session';
import { getBasePath } from '@documenso/lib/constants/app';
import {
  APP_I18N_OPTIONS,
  type SupportedLanguageCodes,
  ZSupportedLanguageCodeSchema,
} from '@documenso/lib/constants/i18n';
import { createPublicEnv } from '@documenso/lib/utils/env';
import { extractLocaleData } from '@documenso/lib/utils/i18n';
import { prisma } from '@documenso/prisma';
import { TrpcProvider } from '@documenso/trpc/react';
import { getOrganisationSession } from '@documenso/trpc/server/organisation-router/get-organisation-session';
import { Toaster } from '@documenso/ui/primitives/toaster';
import { TooltipProvider } from '@documenso/ui/primitives/tooltip';
import { Trans } from '@lingui/react/macro';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { useEffect } from 'react';
import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useMatches,
} from 'react-router';
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from 'remix-themes';
import type { Route } from './+types/root';
import stylesheet from './app.css?url';
import { GenericErrorLayout } from './components/general/generic-error-layout';
import { langCookie } from './storage/lang-cookie.server';
import { themeSessionResolver } from './storage/theme-session.server';
import { appMetaTags } from './utils/meta';
import { nonce } from './utils/nonce';

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }];

export function meta() {
  return appMetaTags();
}

/**
 * Don't revalidate (run the loader on sequential navigations) on the root layout
 *
 * Update values via providers.
 */
export const shouldRevalidate = () => false;

export async function loader({ context, request, params }: Route.LoaderArgs) {
  const session = await getOptionalSession(request);

  const { getTheme } = await themeSessionResolver(request);

  const cookieHeader = request.headers.get('cookie') ?? '';

  let lang: SupportedLanguageCodes = await langCookie.parse(cookieHeader);

  if (!APP_I18N_OPTIONS.supportedLangs.includes(lang)) {
    lang = extractLocaleData({ headers: request.headers }).lang;
  }

  const pathname = new URL(request.url).pathname;
  const isSigningRoute = pathname.split('/').filter(Boolean)[0] === 'sign';
  let shouldPersistLanguage = true;

  if (isSigningRoute && params.token) {
    const recipient = await prisma.recipient.findFirst({
      where: { token: params.token },
      select: {
        envelope: {
          select: {
            documentMeta: {
              select: { language: true },
            },
          },
        },
      },
    });

    const documentLanguage = ZSupportedLanguageCodeSchema.safeParse(recipient?.envelope.documentMeta?.language);

    if (documentLanguage.success) {
      lang = documentLanguage.data;
      shouldPersistLanguage = false;
    }
  }

  const disableAnimations = cookieHeader.includes('__disable_animations=true');

  let organisations = null;

  if (session.isAuthenticated) {
    organisations = await getOrganisationSession({ userId: session.user.id });
  }

  return data(
    {
      lang,
      theme: getTheme(),
      disableAnimations,
      basePath: getBasePath(),
      // Surface the per-request CSP nonce produced by `securityHeadersMiddleware` so all
      // SSR-rendered <script>/<style> elements in this layout (and child
      // routes that need it) can carry the matching nonce attribute.
      nonce: context.nonce,
      session: session.isAuthenticated
        ? {
            user: session.user,
            session: session.session,
            organisations: organisations || [],
          }
        : null,
      publicEnv: createPublicEnv(),
    },
    {
      headers: {
        ...(shouldPersistLanguage ? { 'Set-Cookie': await langCookie.serialize(lang) } : {}),
      },
    },
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, basePath } = useLoaderData<typeof loader>() || {};

  return (
    <ThemeProvider specifiedTheme={theme} themeAction={`${basePath ?? ''}/api/theme`}>
      <LayoutContent>{children}</LayoutContent>
    </ThemeProvider>
  );
}

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const {
    publicEnv,
    session,
    lang,
    disableAnimations,
    nonce: cspNonce,
    ...data
  } = useLoaderData<typeof loader>() || {};

  const [theme] = useTheme();

  const basePath = data.basePath ?? '';

  // Recipient routes (signing pages) put `documenso-branded` on <body> so the
  // <style> block from `RecipientBranding` applies to BOTH the main tree and
  // any portaled content (Radix dialogs/popovers/dropdowns mount outside the
  // route tree, attached directly to document.body).
  const matches = useMatches();
  const isRecipientRoute = matches.some((m) => m.id?.startsWith('routes/_recipient+'));

  return (
    // `suppressHydrationWarning` because `remix-themes` intentionally mutates
    // `data-theme`/`class` on <html> before hydration (PreventFlashOnWrongTheme),
    // so the server-rendered attributes never match the client render when the
    // theme is resolved from the system preference. Attribute-only, one level deep.
    <html translate="no" lang={lang} data-theme={theme} className={theme ?? ''} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="apple-touch-icon" sizes="180x180" href={`${basePath}/favicon.svg`} />
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${basePath}/bbak-logo-light.svg`}
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${basePath}/bbak-logo-dark.svg`}
          media="(prefers-color-scheme: dark)"
        />
        <link rel="icon" type="image/x-icon" href={`${basePath}/favicon.ico`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href={`${basePath}/site.webmanifest`} />
        <meta name="google" content="notranslate" />
        <Meta />
        <Links nonce={nonce(cspNonce)} />
        <meta name="google" content="notranslate" />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} nonce={nonce(cspNonce)} />

        {disableAnimations && (
          <style
            nonce={nonce(cspNonce)}
            dangerouslySetInnerHTML={{
              __html: `*, *::before, *::after { animation: none !important; transition: none !important; }`,
            }}
          />
        )}

        {/* Fix: https://stackoverflow.com/questions/21147149/flash-of-unstyled-content-fouc-in-firefox-only-is-ff-slow-renderer */}
        <script nonce={nonce(cspNonce)}>0</script>
      </head>
      <body className={isRecipientRoute ? 'documenso-branded' : undefined}>
        {/* Global license banner currently disabled. Need to wait until after a few releases. */}
        {/* {licenseStatus === '?' && (
          <div className="bg-destructive text-destructive-foreground">
            <div className="mx-auto flex h-auto max-w-screen-xl items-center justify-center px-4 py-3 text-sm font-medium">
              <div className="flex items-center">
                <AlertTriangleIcon className="mr-2 h-4 w-4" />
                <Trans>This is an expired license instance of Documenso</Trans>
              </div>
            </div>
          </div>
        )} */}

        <NuqsAdapter>
          <SessionProvider initialSession={session}>
            <TooltipProvider>
              <TrpcProvider>
                {children}

                <Toaster />
              </TrpcProvider>
            </TooltipProvider>
          </SessionProvider>
        </NuqsAdapter>

        <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-50 border-border border-t bg-background/95 px-3 py-1 text-center text-muted-foreground text-xs backdrop-blur">
          <a
            href="https://github.com/b-bak-de/documenso"
            target="_blank"
            rel="noreferrer"
            className="pointer-events-auto underline hover:text-foreground"
          >
            <Trans>Source code</Trans>
          </a>{' '}
          <span aria-hidden="true">·</span>{' '}
          <a
            href="https://github.com/b-bak-de/documenso/blob/main/LICENSE"
            target="_blank"
            rel="noreferrer"
            className="pointer-events-auto underline hover:text-foreground"
          >
            <Trans>AGPLv3</Trans>
          </a>
        </footer>

        <script
          nonce={nonce(cspNonce)}
          dangerouslySetInnerHTML={{
            // `__webpack_nonce__` is read by `get-nonce` (used by
            // react-remove-scroll / react-style-singleton inside Radix menus and
            // dialogs) to stamp runtime-injected <style> elements. Without it the
            // strict `style-src-elem` CSP blocks the scroll-lock styles.
            __html: `window.__ENV__ = ${JSON.stringify(publicEnv)}; window.__webpack_nonce__ = ${JSON.stringify(cspNonce ?? '')}`,
          }}
        />

        <ScrollRestoration nonce={nonce(cspNonce)} />
        <Scripts nonce={nonce(cspNonce)} />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const analytics = useAnalytics();

  const errorCode = isRouteErrorResponse(error) ? error.status : 500;

  if (errorCode !== 404) {
    console.error('[RootErrorBoundary]', error);
  }

  useEffect(() => {
    if (errorCode !== 404) {
      analytics.captureException(error, { source: 'app', location: 'root_boundary' });
    }
  }, [error]);

  return <GenericErrorLayout errorCode={errorCode} />;
}

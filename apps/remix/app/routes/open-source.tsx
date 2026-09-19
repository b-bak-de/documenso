import { msg } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';

import { appMetaTags } from '~/utils/meta';

export function meta() {
  return appMetaTags(msg`Open Source`);
}

export default function OpenSource() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <article className="prose dark:prose-invert">
        <h1>
          <Trans>Open Source</Trans>
        </h1>
        <p>
          <Trans>
            This service is based on the Documenso Community Edition and is licensed under the GNU Affero General Public
            License, version 3.0 (AGPL-3.0).
          </Trans>
        </p>
        <p>
          <Trans>
            The complete corresponding source code for this deployed B-BAK version is available in our deployed fork:
          </Trans>{' '}
          <a href="https://github.com/b-bak-de/documenso" target="_blank" rel="noreferrer">
            <Trans>B-BAK Documenso fork</Trans>
          </a>
          .
        </p>
        <p>
          <Trans>The license text is available here:</Trans>{' '}
          <a href="https://github.com/b-bak-de/documenso/blob/main/LICENSE" target="_blank" rel="noreferrer">
            <Trans>GNU AGPL-3.0 license</Trans>
          </a>
          .
        </p>
      </article>
    </main>
  );
}

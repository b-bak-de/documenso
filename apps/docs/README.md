# @documenso/docs

The B-BAK documentation site, built with [Next.js](https://nextjs.org/) and [Fumadocs](https://fumadocs.dev/). Published at [b-bak.de](https://b-bak.de).

Content lives under `content/docs/` as MDX. See [WRITING_STYLE.md](../../WRITING_STYLE.md) for the documentation writing conventions.

```bash
# From the monorepo root
npm run dev --filter=@documenso/docs
```

## Structure

- `content/docs/`: Documentation pages (MDX).
- `lib/source.ts`: Content source adapter.
- `lib/layout.shared.tsx`: Shared layout options.

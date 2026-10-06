# fariszenunovic.com

Personal site of Faris Zenunović, SEO specialist. Next.js 16 (App Router), React 19, Tailwind CSS 4, next-intl, Framer Motion.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build, also type-checks
npm run lint
```

## Structure

| Path | What |
| --- | --- |
| `app/[locale]/page.tsx` | Home: hero, growth chart, portfolio, experience, education, contact |
| `app/[locale]/o-meni` | About page, the entity home for the Person schema node |
| `app/[locale]/usluge` | SEO services and pricing (Service + FAQPage schema) |
| `app/[locale]/projekti/[slug]` | Case studies, statically generated from `lib/projects.ts` |
| `app/components/` | Section components (client components where they animate) |
| `lib/entity.ts` | Single source of truth for name, profiles, schema `@id`s |
| `lib/projects.ts` | Portfolio data: images, links, case study slugs |
| `messages/{en,bs}.json` | All copy, per language |
| `proxy.ts` | next-intl locale routing (`/en`, `/bs`) |

## Common edits

- **Add a portfolio project:** add an entry to `PROJECTS` in `lib/projects.ts` and a matching item, at the same index, in `portfolio.projects` in both message files.
- **Add a case study:** give the project a `slug`, then add `caseStudies.<slug>` to both message files (shape: `CaseStudyMsg` in `lib/projects.ts`). The page, sitemap entry and cross-links are generated from it. Bump `UPDATED.caseStudies` in `app/sitemap.ts`.
- **Change contact details or profiles:** `lib/entity.ts` only. The UI and the JSON-LD both read from it.
- **Don't change** `PERSON_ID` / `ORG_ID` in `lib/entity.ts`: the ZT Media site uses the same strings to merge both sites into one entity.

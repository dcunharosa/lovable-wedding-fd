# CLAUDE.md

## Branching Workflow

Always create a new branch for any code changes — never commit directly to `main`.
Commit and push the branch to the remote so changes can be previewed on Vercel.
Only merge into `main` when explicitly told to by the user.
Always push after committing or merging — never leave commits local-only.

## Translations (i18n)

The site supports English and Portuguese (pt-PT). All user-facing text lives in `src/i18n/translations/en.ts` and `src/i18n/translations/pt.ts`.

Whenever any text/copy is added or changed in the codebase, **always update both translation files** to keep them in sync. A missing key in `pt.ts` will cause a TypeScript build error.

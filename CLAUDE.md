# CLAUDE.md

## Branching Workflow

**Before any commit**, run `git branch --show-current` to verify the current branch.
If you are on `main`, create and switch to a new feature branch first (`git checkout -b feature/<name>`).
Never commit directly to `main` — always use a feature branch.
Commit and push the branch to the remote so changes can be previewed on Vercel.
Only merge into `main` when explicitly told to by the user.
Always push after committing or merging — never leave commits local-only.

## Translations (i18n)

The site supports English and Portuguese (pt-PT). All user-facing text lives in `src/i18n/translations/en.ts` and `src/i18n/translations/pt.ts`.

Whenever any text/copy is added or changed in the codebase, **always update both translation files** to keep them in sync. A missing key in `pt.ts` will cause a TypeScript build error.

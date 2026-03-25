# CLAUDE.md

## Branching Workflow

Never commit directly to `main` — always use a feature branch.
**Verify the branch and commit atomically in a single chained command** to prevent the IDE from switching branches between steps:
```
git branch --show-current && git add <files> && git commit -m "..."
```
If the branch is `main`, create and switch to a feature branch first (`git checkout -b feature/<name>`).
Commit and push the branch to the remote so changes can be previewed on Vercel.
Only merge into `main` when explicitly told to by the user.
Always push after committing or merging — never leave commits local-only.

## Translations (i18n)

The site supports English and Portuguese (pt-PT). All user-facing text lives in `src/i18n/translations/en.ts` and `src/i18n/translations/pt.ts`.

Whenever any text/copy is added or changed in the codebase, **always update both translation files** to keep them in sync. A missing key in `pt.ts` will cause a TypeScript build error.

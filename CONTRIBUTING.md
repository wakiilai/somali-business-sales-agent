# Contributing

## Before changing code

1. Read `README.md` and the relevant files in `docs/`.
2. Confirm the change has one testable acceptance criterion.
3. Confirm the change does not cross the ERP boundary.
4. Use synthetic data only.
5. Never commit secrets, credentials, tokens, real customer records, or production connection strings.

## Change requirements

- Use a feature branch and pull request.
- Add or update tests for behavior changes.
- Add or update security documentation for authorization, data, AI, integration, or workflow changes.
- Preserve tenant isolation and human-approval rules.
- Use conventional commit messages.
- Run `pnpm verify:foundation`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` before requesting review.

## Pull requests

A pull request must state what changed, why it changed, the acceptance criterion, tests and real results, security/privacy impact, migration/rollback impact, and known limitations.

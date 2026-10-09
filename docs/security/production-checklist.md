# Production Security Checklist

## Governance

- [ ] Scope, non-goals, and manual baseline approved.
- [ ] Repository has protected `main` and reviewed changes.
- [ ] No secrets, credentials, or real customer data in Git history.

## Identity and authorization

- [ ] Separate project authentication and database verified.
- [ ] Tenant scope is server-derived.
- [ ] Role permissions are enforced outside the UI.
- [ ] Cross-tenant reads and writes fail.
- [ ] Approval bypass attempts fail.

## AI and tools

- [ ] Tool allowlist is explicit.
- [ ] No arbitrary SQL, shell, URL, or unrestricted API access.
- [ ] Prompt-injection tests pass.
- [ ] Malicious catalog-content tests pass.
- [ ] AI abstains on missing or conflicting data.
- [ ] Somali, English, mixed-language, and voice evaluations pass.

## Reliability

- [ ] Webhook signatures and replay protection pass.
- [ ] Idempotency tests pass.
- [ ] Retry and timeout behavior is bounded.
- [ ] Partial failures are visible and recoverable.
- [ ] Rate, size, duration, concurrency, and cost limits are tested.

## Data protection

- [ ] Data classification and retention policy approved.
- [ ] Logs are redacted and access-controlled.
- [ ] Development uses synthetic data.
- [ ] Backup and restoration are tested.
- [ ] Incident response drill is recorded.

## Release

- [ ] Lint, typecheck, unit, integration, security, RLS, and build checks pass.
- [ ] Dependency and secret scans pass.
- [ ] Migration verification passes.
- [ ] Staging verification passes.
- [ ] Known limitations are documented.

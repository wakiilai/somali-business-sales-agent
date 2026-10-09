# Release Gates

A release is eligible for review only when all applicable gates have evidence.

1. Product scope and acceptance criterion are current.
2. Manual-to-automated workflow remains documented.
3. Typecheck, lint, unit, integration, contract, and build checks pass.
4. RLS and cross-tenant authorization tests pass.
5. AI tool permission and prompt-injection tests pass.
6. Webhook signature, replay, retry, timeout, and idempotency tests pass.
7. Secret and dependency scans pass.
8. Migration validation passes without editing applied migrations.
9. E2E or manual browser verification covers the changed workflow.
10. Logs and audit events are checked for redaction and provenance.
11. Rollback and recovery impact is documented.
12. The final diff contains no unrelated files, secrets, or generated artifacts.

A passing CI run is necessary but not sufficient for a production claim. Security-sensitive changes also require human review of the evidence and applicable runbooks.

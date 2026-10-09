# Security Testing

Security tests are executable evidence, not documentation-only claims.

Required suites:

- Authorization and role matrix.
- Cross-tenant read/write denial.
- Prompt injection and indirect instruction attacks.
- Tool allowlist and approval enforcement.
- Webhook signature, timestamp, and replay handling.
- Idempotency under duplicate delivery.
- Rate, payload, file, duration, timeout, and quota limits.
- Redaction and secret-exposure checks.
- Safe failure when catalog or external providers are unavailable.
- Somali, English, mixed-language, and adversarial evaluation.

Each security-sensitive test must state the invariant it protects and the evidence produced by a passing run.

# Security test plan

This directory will contain executable security tests. The first implementation wave must add tests for:

- Cross-tenant read and write denial.
- Role and approval enforcement.
- Prompt injection and malicious catalog content.
- Webhook signature, timestamp, and replay rejection.
- Idempotency under duplicate delivery.
- Rate, payload, file, and timeout limits.
- Secret and personal-data redaction.

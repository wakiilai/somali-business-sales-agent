# Webhook Contracts

Every inbound event must define:

- Event identifier.
- Event type and version.
- Tenant mapping from a trusted integration.
- Timestamp and replay window.
- Signature algorithm and verification input.
- Schema validation rules.
- Idempotency behavior.
- Retry and dead-letter behavior.
- Redacted audit event.

Invalid, unsigned, expired, malformed, or duplicate events must not create business side effects.

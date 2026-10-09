# Test Strategy

Testing follows risk rather than only code coverage.

- Unit: domain invariants, validation, policy decisions, redaction.
- Integration: database, adapters, state transitions, retries, audit events.
- Contract: API, webhook, tool, and event schemas.
- RLS: tenant and role isolation against a local isolated database.
- AI evaluation: Somali, English, mixed-language, ambiguity, hallucination, and prompt injection.
- E2E: customer chat, staff approval, handoff, and failure recovery.
- Operational: rate limits, timeouts, duplicate events, backup restore, and incident runbooks.

Every high-risk behavior needs a named invariant and a reproducible test command.
